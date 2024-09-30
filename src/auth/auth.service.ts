import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificationCode } from './entities/verification-code.entity';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import * as bcrypt from 'bcrypt';
import { Company } from 'src/company/company/entities/company.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(VerificationCode)
    private verificationCodeRepository: Repository<VerificationCode>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async createUser(
    company: string,
    {
      advertising,
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
    }: CreateUserDto,
  ) {
    try {
      const [companyDetail] = await this.companyRepository.find({
        where: { name: company },
      });
      if (!companyDetail)
        throw new BadRequestException(`La empresa "${company}" no existe`);
      await this.isEmailRegister(company, email);
      await this.isIdCardRegister(idCard, email);
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
      };
      if (type === 'Default') {
        await this.validateCodeEmail(company, email, emailCode.toString());
        body.password = bcrypt.hashSync(password, 10);
      }

      const newUser = this.userRepository.create(body);
      const user = await this.userRepository.save(newUser);

      const newStudent = this.studentRepository.create({
        companyId: companyDetail.id,
        advertising: 1,
        userId: user.id,
      });
      const student = await this.studentRepository.save(newStudent);
      return { ...user, student };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async isEmailRegister(company: string, email: string) {
    try {
      const [student] = await this.studentRepository.find({
        where: { user: { email: email }, company: { name: company } },
      });
      if (student)
        throw new BadRequestException(
          `El correo "${email}" ya esta registrado en ${company}`,
        );
    } catch (error) {
      throw error;
    }
  }

  private async isIdCardRegister(company: string, idCard: string) {
    try {
      const [student] = await this.studentRepository.find({
        where: { user: { idCard: idCard }, company: { name: company } },
      });
      if (student)
        throw new BadRequestException(
          `El carnet de identidad "${idCard}" ya esta registrado en ${company}`,
        );
    } catch (error) {
      throw error;
    }
  }

  private async validateCodeEmail(
    company: string,
    email: string,
    emailCode: string,
  ) {
    try {
      const [verificationCode] = await this.verificationCodeRepository.find({
        select: { code: true },
        where: {
          code: emailCode,
          email: email,
          company: {
            name: company,
          },
        },
      });
      if (!verificationCode)
        throw new BadRequestException('El código email no es correcto');
      await this.verificationCodeRepository.update(
        { code: emailCode, email: email, company: { name: company } },
        { status: 1 },
      );
      return verificationCode;
    } catch (error) {
      throw error;
    }
  }
}
