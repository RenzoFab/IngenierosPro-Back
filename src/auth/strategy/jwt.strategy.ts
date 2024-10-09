import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { PassportStrategy } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { User } from '../entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ studentId, userId }: JwtPayload) {
    const user = await this.userRepository.findOne({
      relations: ['student', 'student.company'],
      select: { student: { companyId: true, company: { name: true } } },
      where: {
        id: userId,
        student: { id: studentId },
      },
    });
    if (!user) throw new UnauthorizedException('Token invalido');
    const companyId = user.student.companyId;
    const companyName = user.student.company.name;
    delete user.id;
    delete user.student;
    return { ...user, studentId, userId, companyId, companyName };
  }
}
