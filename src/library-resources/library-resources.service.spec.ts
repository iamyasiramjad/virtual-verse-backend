import { Test, TestingModule } from '@nestjs/testing';
import { LibraryResourcesService } from './library-resources.service';

describe('LibraryResourcesService', () => {
  let service: LibraryResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibraryResourcesService],
    }).compile();

    service = module.get<LibraryResourcesService>(LibraryResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
