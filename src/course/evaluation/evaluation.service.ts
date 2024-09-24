import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
  ) {}

  // create(createEvaluationDto: CreateEvaluationDto) {
  //   return 'This action adds a new evaluation';
  // }

  async findAll() {
    const evaluations = await this.evaluationRepository.find();
    return evaluations;
  }

  async findOne(id: number) {
    const [evaluation] = await this.evaluationRepository.findBy({ id });

    return evaluation;
  }

  // update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
  //   return `This action updates a #${id} evaluation`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} evaluation`;
  // }
}
