// src/library-resources/dto/create-library-resource.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLibraryResourceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  category: string; // e.g., "Quran", "Hadith", "Stories"
}
