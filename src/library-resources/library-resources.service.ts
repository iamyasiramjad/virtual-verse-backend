// src/library-resources/library-resources.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path if needed
import { CreateLibraryResourceDto } from './dto/create-library-resource.dto';
import { UpdateLibraryResourceDto } from './dto/update-library-resource.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class LibraryResourcesService {
  private readonly BUCKET_NAME = 'library-resources';

  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  async create(
    createLibraryResourceDto: CreateLibraryResourceDto,
    file: Express.Multer.File, // <-- ACCEPT THE FILE
  ) {
    const folderName = createLibraryResourceDto.category
      .toLowerCase()
      .replace(/\s+/g, '-');

    // 1. Upload the file to Supabase Storage
    const fileUrl = await this.supabaseService.uploadFile(
      file,
      this.BUCKET_NAME,
      folderName,
    );

    // 2. Save the resource metadata (including the new URL) to the database
    return this.prisma.libraryResource.create({
      data: {
        ...createLibraryResourceDto,
        fileUrl: fileUrl, // <-- SAVE THE URL
      },
    });
  }

  findAll() {
    return this.prisma.libraryResource.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const resource = await this.prisma.libraryResource.findUnique({
      where: { id },
    });
    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found.`);
    }
    return resource;
  }

  async update(id: number, updateLibraryResourceDto: UpdateLibraryResourceDto) {
    try {
      return await this.prisma.libraryResource.update({
        where: { id },
        data: updateLibraryResourceDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Resource with ID ${id} not found.`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.libraryResource.delete({ where: { id } });
      return { message: `Successfully deleted resource with ID ${id}` };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Resource with ID ${id} not found.`);
      }
      throw error;
    }
  }
}
