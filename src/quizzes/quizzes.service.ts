// src/quizzes/quizzes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path if needed
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  create(createQuizDto: CreateQuizDto) {
    return this.prisma.quiz.create({ data: createQuizDto });
  }

  findAll() {
    return this.prisma.quiz.findMany();
  }

  async findOne(id: number) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found.`);
    }
    return quiz;
  }

  async update(id: number, updateQuizDto: UpdateQuizDto) {
    try {
      return await this.prisma.quiz.update({
        where: { id },
        data: updateQuizDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Quiz with ID ${id} not found.`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.quiz.delete({ where: { id } });
      return { message: `Successfully deleted quiz with ID ${id}` };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Quiz with ID ${id} not found.`);
      }
      throw error;
    }
  }
}
