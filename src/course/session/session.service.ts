import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { FindSessionDto } from './dto/find-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  // create(createSessionDto: CreateSessionDto) {
  //   return 'This action adds a new session';
  // }

  // async findAll({ moduleId, state }: FindSessionDto) {
  //   const sessions = await this.sessionRepository.find({
  //     where: {
  //       moduleId,
  //       state,
  //     },
  //     take: moduleId ? undefined : 20,
  //   });
  //   return sessions;
  // }

  // async findOne(id: number) {
  //   const [session] = await this.sessionRepository.findBy({ id });
  //   return session;
  // }

  // update(id: number, updateSessionDto: UpdateSessionDto) {
  //   return `This action updates a #${id} session`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} session`;
  // }
}
