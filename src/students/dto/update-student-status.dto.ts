// src/students/dto/update-student-status.dto.ts
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StudentStatus } from '@prisma/client'; // Import the enum directly from Prisma Client

export class UpdateStudentStatusDto {
  @IsEnum(StudentStatus)
  @IsNotEmpty()
  status: StudentStatus;
}
