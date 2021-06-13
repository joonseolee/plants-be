import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigMainDBService } from './configuration.service';

describe('ConfigServiceTest', () => {
  let service: ConfigMainDBService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        ConfigMainDBService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: {
            folder: 'config',
          },
        },
      ],
    }).compile();
    service = moduleRef.get<ConfigMainDBService>(ConfigMainDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.type).toBe('mysql');
  });
});
