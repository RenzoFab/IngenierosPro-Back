import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CulqiService } from './culqi.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import {
  CreateCulqiChargeDto,
  CreateCulqiOrderDto,
  CreateProductCulqiChargeDto,
  CreateProductCulqiOrderDto,
} from './dto';
import { WebhookOrder } from './interfaces';

@ApiTags('culqi')
@Controller('culqi')
export class CulqiController {
  constructor(private readonly culqiService: CulqiService) {}

  @ApiOperation({
    summary: 'Creacion de orden culqi',
  })
  @Post('order/:institucion')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  createOrder(
    @Body() createCulqiOrderDto: CreateCulqiOrderDto,
    @GetUser('companyName') companyName: string,
  ) {
    return this.culqiService.createOrder(companyName, createCulqiOrderDto);
  }

  @ApiOperation({
    summary: 'Obtener detalles de orden culqi',
  })
  @Get('order/:order_id')
  getOrder(@Param('order_id') order_id: string) {
    return this.culqiService.getOrder(order_id);
  }

  @ApiOperation({
    summary: 'Registrar orden culqi en la BD',
  })
  @Post('order/:order_id/register')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  registerOrder(
    @Param('order_id') order_id: string,
    @Body() createProductCulqiOrderDto: CreateProductCulqiOrderDto,
    @GetUser('studentId') studentId: number,
  ) {
    return this.culqiService.registerOrder(
      studentId,
      order_id,
      createProductCulqiOrderDto,
    );
  }

  @ApiOperation({
    summary:
      'Creacion de orden culqi, validando que el estudiante no compre productos repetidos',
  })
  @Post('order/:institucion/validated')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  createValidatedOrder(
    @Body() createProductCulqiOrderDto: CreateProductCulqiOrderDto,
    @GetUser(['studentId', 'companyName'])
    { studentId, companyName }: { studentId: number; companyName: string },
  ) {
    return this.culqiService.createValidatedOrder(
      studentId,
      companyName,
      createProductCulqiOrderDto,
    );
  }

  @ApiOperation({
    summary:
      'Webhook culqi - Recibir cambio de estado de la orden culqi y matricular al estudiante',
  })
  @Post('webhook')
  webhook(@Body() payload: WebhookOrder) {
    return this.culqiService.webhookOrderChanged(payload);
  }

  @ApiOperation({
    summary: 'Creación de cargo culqi',
  })
  @Post('charge/:institucion')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  createCharge(
    @GetUser('companyName') companyName: string,
    @Body() createCulqiChargeDto: CreateCulqiChargeDto,
  ) {
    return this.culqiService.createCharge(companyName, createCulqiChargeDto);
  }

  @ApiOperation({
    summary: 'Capturar cargo culqi',
  })
  @Put('charge/:chargeId')
  captureCharge(@Param('chargeId') chargeId: string) {
    return this.culqiService.captureCharge(chargeId);
  }

  @ApiOperation({
    summary:
      'Creacion de cargo culqi, validando que el estudiante no compre productos repetidos Matriculandolo y capturando el cargo',
  })
  @Post('charge/:institucion/enroll')
  chargeAndEnroll(
    @GetUser(['studentId', 'companyName'])
    { studentId, companyName }: { studentId: number; companyName: string },
    @Body() createProductCulqiChargeDto: CreateProductCulqiChargeDto,
  ) {
    return this.culqiService.chargeAndEnroll(
      studentId,
      companyName,
      createProductCulqiChargeDto,
    );
  }
}
