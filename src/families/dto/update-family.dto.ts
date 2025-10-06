import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateFamilyDto {
  @IsString()
  @IsOptional()
  familyName?: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password?: string;
}
