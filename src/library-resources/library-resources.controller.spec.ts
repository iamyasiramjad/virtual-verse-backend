import { Test, TestingModule } from '@nestjs/testing';
import { LibraryResourcesController } from './library-resources.controller';
import { LibraryResourcesService } from './library-resources.service';

describe('LibraryResourcesController', () => {
  let controller: LibraryResourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryResourcesController],
      providers: [LibraryResourcesService],
    }).compile();

    controller = module.get<LibraryResourcesController>(LibraryResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
