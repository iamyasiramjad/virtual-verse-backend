// src/quizzes/dto/create-quiz.dto.ts
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsObject() // This validator checks if the value is a JavaScript object
  @IsOptional()
  content?: Prisma.JsonValue; // Use Prisma's generated type for JSON
}
