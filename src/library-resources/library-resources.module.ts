import { Module } from '@nestjs/common';
import { LibraryResourcesService } from './library-resources.service';
import { LibraryResourcesController } from './library-resources.controller';

@Module({
  controllers: [LibraryResourcesController],
  providers: [LibraryResourcesService],
})
export class LibraryResourcesModule {}
