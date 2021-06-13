import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './entities/school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const newSchool: School = createSchoolDto as School;
    return this.schoolRepository.save(newSchool);
  }

  findAll(): Promise<School[]> {
    return this.schoolRepository.find();
  }

  findOne(id: number): Promise<School> {
    return this.schoolRepository.findOne(id);
  }

  async remove(id: number) {
    const school: School = await this.findOne(id);
    return this.schoolRepository.remove(school);
  }
}
