// src/students/dto/create-student.dto.ts
import {
  IsDateString,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  age?: number;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @IsInt()
  @IsNotEmpty()
  familyId: number;

  @IsString()
  @IsOptional()
  country?: string;

  @IsDecimal() // Use IsDecimal for financial values to ensure format
  @IsOptional()
  tuitionFee?: string; // DTOs receive numbers as strings in multipart/form-data, robust to handle both

  @IsString()
  @Length(3, 3, { message: 'Currency must be a 3-letter code (e.g., USD)' })
  @IsOptional()
  currency?: string;

  @IsDateString()
  @IsOptional()
  enrolledAt?: string;
}
