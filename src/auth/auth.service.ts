import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginDto, SendCodeEmailDto } from './dto';
import { VerificationCode, User, Student } from './entities';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(VerificationCode)
    private verificationCodeRepository: Repository<VerificationCode>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private jwtService: JwtService,
  ) {}

  async login({ companyId, email, password }: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        relations: ['student'],
        where: { email, student: { companyId } },
      });
      if (!user) throw new NotFoundException('Usuario no encontrado');
      // const isPasswordValid = await bcrypt.compare(password, user.password);
      // if (!isPasswordValid)
      //   throw new BadRequestException('Contraseña incorrecta');
      return {
        name: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: this.getJwtToken({
          studentId: user.student.id,
          userId: user.id,
        }),
      };
    } catch (error) {
      throw error;
    }
  }

  async sendCodeEmail({ companyId, email }: SendCodeEmailDto) {
    try {
      const verificationCode = await this.verificationCodeRepository.findOne({
        where: { companyId, email },
      });
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      if (verificationCode) {
        if (verificationCode.status === 1) {
          throw new BadRequestException('El correo ya se encuentra registrado');
        }
        verificationCode.code = code;
        return await this.verificationCodeRepository.save(verificationCode);
      }
      const newVerificationCode = this.verificationCodeRepository.create({
        code,
        companyId,
        email,
      });
      const response =
        await this.verificationCodeRepository.save(newVerificationCode);
      return { code: response.code, email: response.email };
    } catch (error) {
      if (error?.errno === 1452) {
        throw new BadRequestException(
          'La empresa no existe o no se puede asociar con el código de verificación.',
        );
      }
      throw error;
    }
  }

  async createUser({
    birthDate,
    country,
    email,
    emailCode,
    idCard,
    name,
    phone,
    lastName,
    type,
    password,
    companyId,
  }: CreateUserDto) {
    try {
      await this.isEmailRegister(companyId, email);
      await this.isIdCardRegister(companyId, idCard);
      let body: DeepPartial<User> = {
        birthDate,
        country,
        countryOfOrigin: country,
        email,
        firstName: name,
        lastName,
        idCard,
        createdAt: new Date(),
        phone,
        idRol: 4,
        isVerified: 1,
      };
      if (type === 'Default') {
        await this.validateCodeEmail(companyId, email, emailCode.toString());
        body.password = bcrypt.hashSync(password, 10);
      }

      const newUser = this.userRepository.create(body);
      const user = await this.userRepository.save(newUser);

      const newStudent = this.studentRepository.create({
        companyId,
        advertising: 1,
        userId: user.id,
      });
      const student = await this.studentRepository.save(newStudent);
      return {
        name: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: this.getJwtToken({
          studentId: student.id,
          userId: user.id,
        }),
      };
    } catch (error) {
      throw error;
    }
  }

  private async isEmailRegister(companyId: number, email: string) {
    try {
      const [student] = await this.studentRepository.find({
        where: { user: { email: email }, companyId },
      });
      if (student)
        throw new BadRequestException(
          `El correo "${email}" ya esta registrado en la empresa "${companyId}"`,
        );
    } catch (error) {
      throw error;
    }
  }

  private async isIdCardRegister(companyId: number, idCard: string) {
    try {
      const [student] = await this.studentRepository.find({
        where: { user: { idCard: idCard }, companyId },
      });
      console.log(student);
      if (student)
        throw new BadRequestException(
          `El carnet de identidad "${idCard}" ya esta registrado en la empresa "${companyId}"`,
        );
    } catch (error) {
      throw error;
    }
  }

  private async validateCodeEmail(
    companyId: number,
    email: string,
    emailCode: string,
  ) {
    try {
      const verificationCode = await this.verificationCodeRepository.findOne({
        where: {
          code: emailCode,
          email: email,
          companyId,
        },
      });
      if (!verificationCode)
        throw new BadRequestException('El código email no es correcto');
      verificationCode.status = 1;
      await this.verificationCodeRepository.save(verificationCode);
      return verificationCode;
    } catch (error) {
      if (error?.errno === 1452) {
        throw new BadRequestException(
          'La empresa no existe o no se puede asociar con el código de verificación.',
        );
      }
      throw error;
    }
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
