import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';

@Injectable()
export class FamiliesService {
  constructor(private prisma: PrismaService) {}

  async create(createFamilyDto: CreateFamilyDto) {
    const { familyName, password } = createFamilyDto;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const family = await this.prisma.family.create({
      data: {
        familyName,
        passwordHash,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...result } = family;
    return result;
  }

  async findAll() {
    const families = await this.prisma.family.findMany({
      select: {
        id: true,
        familyLink: true,
        familyName: true,
        createdAt: true,
        students: true,
      },
    });
    return families;
  }

  async findOne(id: number) {
    const family = await this.prisma.family.findUnique({
      where: { id },
      include: {
        students: true,
      },
    });

    if (!family) {
      throw new NotFoundException(`Family with ID ${id} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...result } = family;
    return result;
  }

  async update(id: number, updateFamilyDto: UpdateFamilyDto) {
    const data: any = { familyName: updateFamilyDto.familyName };

    if (updateFamilyDto.password) {
      const saltRounds = 10;
      data.passwordHash = await bcrypt.hash(
        updateFamilyDto.password,
        saltRounds,
      );
    }

    const family = await this.prisma.family.update({
      where: { id },
      data,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...result } = family;
    return result;
  }

  async remove(id: number) {
    const familyExists = await this.prisma.family.findUnique({ where: { id } });
    if (!familyExists) {
      throw new NotFoundException(`Family with ID ${id} not found`);
    }

    await this.prisma.family.delete({
      where: { id },
    });

    return { message: `Successfully deleted family with ID ${id}` };
  }
}
