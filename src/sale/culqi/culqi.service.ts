import { SaleService } from './../sale/sale.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FetchAdapter } from 'src/common/adapters/fetch-adapter.interface';
import { DataSource, In, Repository } from 'typeorm';
import {
  CreateCulqiChargeDto,
  CreateCulqiOrderDto,
  CreateProductCulqiChargeDto,
  CreateProductCulqiOrderDto,
  ProductCartDto,
} from './dto';
import { v4 as uuid } from 'uuid';
import { CaptureCharge, CreateOrder, WebhookOrder } from './interfaces';
import { Data } from './interfaces/webhook-order.interface';
import { CreateCharge } from './interfaces/create-charge.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleDetail } from '../sale/entities/sale-detail.entity';

@Injectable()
export class CulqiService {
  constructor(
    @InjectRepository(SaleDetail)
    private saleDetailRepository: Repository<SaleDetail>,
    private readonly saleService: SaleService,
    private readonly dataSource: DataSource,
    private readonly http: FetchAdapter,
  ) {}

  // * Creacion de orden culqi
  async createOrder(
    companyName: string,
    createCulqiOrderDto: CreateCulqiOrderDto,
  ) {
    try {
      const url = 'https://api.culqi.com/v2/orders';
      const data = JSON.stringify({
        amount: createCulqiOrderDto.precio_total * 100,
        currency_code: createCulqiOrderDto.moneda_tipo,
        description: `Venta de productos ${createCulqiOrderDto.external ? 'externos' : ''} ${companyName}`,
        order_number: uuid(),
        expiration_date: this.getExpirationDay(),
        client_details: {
          first_name: this.removeNumbers(createCulqiOrderDto.name),
          last_name: this.removeNumbers(createCulqiOrderDto.lastName),
          email: createCulqiOrderDto.email,
          phone_number: createCulqiOrderDto.phoneNumber,
        },
        confirm: createCulqiOrderDto.confirm ?? false,
        metadata: {
          description: `Venta de productos ${createCulqiOrderDto.external ? 'externos' : ''} ${companyName}`,
        },
      });
      const headers = this.getHeaders();
      const res = await this.http.post<CreateOrder>(url, headers, data);
      const order_id = res.id;
      if (!order_id) {
        console.log(`Culqi error on create order - ${res.merchant_message}`);
        throw new InternalServerErrorException(res.user_message);
      }
      return { order_id };
    } catch (error) {
      console.log(`Culqi error on create order - ${error}`);
      throw error;
    }
  }

  // * Obtener detalles de orden culqi
  async getOrder(id: string) {
    const url = `https://api.culqi.com/v2/orders/${id}`;
    const header = this.getHeaders();
    const response = await this.http.get(url, header);
    return response;
  }

  // * Registrar orden culqi en la BD
  async registerOrder(
    studentId: number,
    order_id: string,
    createProductCulqiOrderDto: CreateProductCulqiOrderDto,
  ) {
    const compra_id = await this.registerPurchaseOnDB(
      studentId,
      order_id,
      createProductCulqiOrderDto,
    );
    return { compra_id };
  }

  // * Creacion de orden culqi, validando que el estudiante no compre productos repetidos
  async createValidatedOrder(
    studentId: number,
    companyName: string,
    createProductCulqiOrderDto: CreateProductCulqiOrderDto,
  ) {
    try {
      await this.validateStudentPurchase(
        studentId,
        companyName,
        createProductCulqiOrderDto.products,
      );
      const { order_id } = await this.createOrder(
        companyName,
        createProductCulqiOrderDto,
      );
      return { order_id };
    } catch (error) {
      console.log(`Culqi error on create order - ${error}`);
      throw error;
    }
  }

  // * Recibir cambio de estado de la orden culqi y matricular al estudiante
  async webhookOrderChanged(payload: WebhookOrder) {
    try {
      console.log('Recibiendo webhook culqi');
      console.log(payload);
      const data = JSON.parse(payload.data) as Data;
      if (data.state === 'paid') {
        console.log(data.id);
        const [
          { compra_productos, compra_id, estudiante_id, institucion_nombre },
        ] = await this.dataSource.query(
          ` SELECT
            tbl_compra.compra_productos,
            tbl_compra.compra_id,
            tbl_estudiante.estudiante_id,
            tbl_institucion.institucion_nombre 
          FROM 
            tbl_compra 
          INNER JOIN 
            tbl_estudiante 
          ON 
            tbl_compra.estudiante_id = tbl_estudiante.estudiante_id
          INNER JOIN 
            tbl_institucion 
          ON 
            tbl_institucion.institucion_id = tbl_estudiante.institucion_id
          WHERE compra_token_pasarela = ?`,
          [data.id],
        );
        //TODO: Crear venta
        // await this.updatePurchaseOnDB(compra_id, data.id);
        //TODO: Crear Detalle venta
        //TODO: Matricular
        // await this.enrollStudents(
        //   institucion_nombre,
        //   compra_id,
        //   estudiante_id,
        //   JSON.parse(compra_productos),
        // );
      }
    } catch (error) {
      console.log(`Culqi error on webhook - ${error}`);
      throw error;
    }
  }

  // * Creación de cargo culqi
  async createCharge(
    institucion: string,
    createCulqiChargeDto: CreateCulqiChargeDto,
  ) {
    try {
      const url = 'https://api.culqi.com/v2/charges';
      const data = JSON.stringify({
        amount: createCulqiChargeDto.precio_total * 100,
        currency_code: createCulqiChargeDto.moneda_tipo,
        email: createCulqiChargeDto.email,
        source_id: createCulqiChargeDto.token_culqi, // * TOKEN
        capture: createCulqiChargeDto.capture ?? false, // * FALSE PARA QUE EL CARGO QUEDE PENDIENTE Y REALIZAR VALIDACIONES
        description: `Venta de productos ${createCulqiChargeDto.external ? 'externos' : ''} ${institucion}`,
        // installments: 2, // * CUOTAS
        metadata: {
          first_name: createCulqiChargeDto.name,
          last_name: createCulqiChargeDto.lastName,
          phone_number: createCulqiChargeDto.phone,
          email: createCulqiChargeDto.email,
          description: `Venta de productos ${createCulqiChargeDto.external ? 'externos' : ''} ${institucion}`,
        },
      });
      const headers = this.getHeaders();
      const res = await this.http.post<CreateCharge>(url, headers, data);
      if (!res.id) throw new BadRequestException(res.merchant_message);
      return res;
    } catch (error) {
      console.log(`Culqi error on create charge - ${error}`);
      throw error;
    }
  }

  // * Capturar cargo culqi
  async captureCharge(chargeId: string) {
    try {
      const url = `https://api.culqi.com/v2/charges/${chargeId}/capture`;
      const headers = this.getHeaders();
      const res = await this.http.post<CaptureCharge>(url, headers);
      return res;
    } catch (error) {
      console.log(`Culqi error on create charge - ${error}`);
      throw error;
    }
  }

  // * Creacion de cargo culqi, validando que el estudiante no compre productos repetidos
  // * Matriculandolo y capturando el cargo
  async chargeAndEnroll(
    studentId: number,
    companyName: string,
    createProductCulqiChargeDto: CreateProductCulqiChargeDto,
  ) {
    try {
      const { products } = createProductCulqiChargeDto;
      const ownProducts = await this.saleDetailRepository.find({
        select: { serviceId: true, serviceType: true },
        where: {
          sale: { studentId },
        },
      });
      ownProducts.forEach((own) => {
        const isDuplicated = products.some(
          (product) =>
            product.id === own.serviceId && product.tipo === own.serviceType,
        );
        if (isDuplicated) {
          throw new BadRequestException(
            `Está intentando comprar un producto que ya ha comprado anteriormente: ${own.serviceType} con id ${own.serviceId}.`,
          );
        }
      });

      const charge = await this.createCharge(
        companyName,
        createProductCulqiChargeDto,
      );

      //TODO: Crear venta
// this.saleService()

      //TODO: Crear Detalle venta
      //TODO: Matricular
      await this.buyProducts(
        charge.id,
        companyName,
        studentId,
        createProductCulqiChargeDto,
      );
      const capture = await this.captureCharge(charge.id);
      return capture;
    } catch (error) {
      console.log(`Culqi error on create charge - ${error}`);
      throw error;
    }
  }

  private getExpirationDay() {
    const now = new Date();
    now.setDate(now.getDate() + 3);
    return Math.floor(now.getTime() / 1000);
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${process.env.CULQI_SECRET}`,
      'content-type': 'application/json',
    };
  }

  private async buyProducts(
    charge_id: string,
    institucion: string,
    estudiante_id: number,
    createProductCulqiChargeDto: CreateProductCulqiChargeDto,
  ) {
    const compra_id = await this.registerPurchaseOnDB(
      estudiante_id,
      charge_id,
      createProductCulqiChargeDto,
    );

    //TODO: Crear venta
    // await this.updatePurchaseOnDB(compra_id, charge_id);
    //TODO: Crear Detalle venta
    //TODO: Matricular
    // await this.enrollStudents(
    //   institucion,
    //   compra_id,
    //   estudiante_id,
    //   createProductCulqiChargeDto.productos,
    // );
  }

  private async validateStudentPurchase(
    estudiante_id: number,
    institucion: string,
    productos: ProductCartDto[],
  ) {
    const productosComprados = await this.getPurchasedProducts(
      institucion,
      estudiante_id,
    );
    this.validateDuplicateProducts(productos, productosComprados);
  }

  private async getPurchasedProducts(
    institucion: string,
    estudiante_id: number,
  ) {
    try {
      const [productosComprados] = await this.dataSource.query(
        'Call sp_listar_productos_comprados(?,?)',
        [institucion, estudiante_id],
      );
      const products: { product_id: number; product_type: string }[] =
        productosComprados.map((product) => {
          return {
            product_id: product.detalleventa_servicio_id,
            product_type: product.detalleventa_tipo_servicio,
          };
        });
      return products;
    } catch (error) {
      console.log(`Culqi error on get purchased products - ${error}`);
      throw error;
    }
  }

  private validateDuplicateProducts(
    products: ProductCartDto[],
    purchasedProducts: { product_id: number; product_type: string }[],
  ) {
    for (const product of products) {
      for (const purchasedProduct of purchasedProducts) {
        if (
          product.id === purchasedProduct.product_id &&
          product.tipo === purchasedProduct.product_type
        ) {
          throw new BadRequestException(
            'Esta intentando comprar un producto que ya ha comprado anteriormente. ' +
              purchasedProduct.product_type +
              ' con id ' +
              purchasedProduct.product_id,
          );
        }
      }
    }
  }

  private async registerPurchaseOnDB(
    estudiante_id: number,
    order_id: string,
    {
      cupon_id,
      moneda_tipo,
      precio_total,
      products,
    }: CreateProductCulqiChargeDto | CreateProductCulqiOrderDto,
  ) {
    try {
      await this.dataSource.query(
        'Call sp_registrar_compra_prueba(?,?,?,?,?,?,?,?,?,@ide_compra)',
        [
          estudiante_id,
          cupon_id,
          precio_total,
          moneda_tipo,
          0, // * impuesto
          order_id,
          'Culqi',
          'Culqi',
          JSON.stringify(products),
        ],
      );
      const [result] = await this.dataSource.query(
        'SELECT @ide_compra AS compra_id',
      );
      return result.compra_id;
    } catch (error) {
      console.log(`PayPal error on register purchase on DB - ${error}`);
      throw error;
    }
  }

  // private async updatePurchaseOnDB(compra_id: number, order_id: string) {
  //   try {
  //     const fecha_actual = new Date()
  //       .toISOString()
  //       .slice(0, 19)
  //       .replace('T', ' ');
  //     await this.dataSource.query(
  //       'CALL sp_update_tbl_compra_prueba(?,?,?,?,?)',
  //       [
  //         compra_id,
  //         0, // * impuesto
  //         order_id,
  //         0,
  //         fecha_actual,
  //       ],
  //     );
  //   } catch (error) {
  //     console.log(`Culqi error on update purchase on DB - ${error}`);
  //     throw error;
  //   }
  // }

  private removeNumbers(input: string): string {
    return input.replace(/\d+/g, '');
  }
}
