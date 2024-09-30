import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { VerificationCode } from './entities/verification-code.entity';
import { Student } from './entities/student.entity';
import { Role } from './entities/role.entity';
import { CompanyModule } from 'src/company/company/company.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User, VerificationCode, Student, Role]),
    CompanyModule,
  ],
})
export class AuthModule {}
