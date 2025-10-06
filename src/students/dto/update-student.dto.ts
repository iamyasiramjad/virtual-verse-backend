// src/students/dto/update-student.dto.ts
import {
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  age?: number;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsDecimal()
  @IsOptional()
  tuitionFee?: string;

  @IsString()
  @Length(3, 3, { message: 'Currency must be a 3-letter code (e.g., USD)' })
  @IsOptional()
  currency?: string;
}
