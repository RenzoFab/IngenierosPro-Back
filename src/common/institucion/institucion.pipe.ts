import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class InstitucionPipe implements PipeTransform {
  private readonly instituciones = [
    'ecoambiental',
    'ghamec',
    'acm',
    'agroambiental',
  ];

  transform(value: string) {
    const valueLowerCase = value.toLowerCase();
    const isValid = this.instituciones.includes(valueLowerCase);
    if (!isValid) {
      throw new BadRequestException(
        `La institución debe ser una de las siguientes instituciones: ${this.instituciones.join(', ')}`,
      );
    }
    return value;
  }
}
