/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Beer } from './schema/beer.schema';
import { BeersService } from './beers.service';

const mockBeer = {
  name: 'Lager Light',
  brand: 'Heineken',
  temperature: 4,
  createdAt: new Date(),
};

describe('BeerService', () => {
  let service: BeersService;
  let model: Model<Beer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeersService,
        {
          provide: getModelToken('Beer'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBeer),
            constructor: jest.fn().mockResolvedValue(mockBeer),
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BeersService>(BeersService);
    model = module.get<Model<Beer>>(getModelToken('Beer'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBeer', () => {
    it('should create a beer and return it', async () => {
      jest.spyOn(model, 'create').mockResolvedValueOnce(mockBeer as any);

      const result = await service.createBeer({
        name: mockBeer.name,
        brand: mockBeer.brand,
        temperature: mockBeer.temperature,
      });

      expect(result).toEqual(mockBeer);
    });
  });

  describe('findAll', () => {
    it('should return an array of beers', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([mockBeer]),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual([mockBeer]);
    });
  });
});
