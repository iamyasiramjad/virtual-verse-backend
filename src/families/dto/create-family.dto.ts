import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateFamilyDto {
  @IsString()
  @IsNotEmpty()
  familyName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password: string;
}
