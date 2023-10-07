import { Test, TestingModule } from '@nestjs/testing';

import { CurrenciesRepository } from './currencies.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { Currencies } from './currencies.entity';

describe('CurrenciesRepository', () => {
  let repository: CurrenciesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesRepository],
    }).compile();

    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });

  describe("getCurrency", () => {
    it("should be called findOneBy with correct params", async () => {
      repository.findOneBy = jest.fn().mockReturnValue({});
      await repository.getCurrency('USD');
      expect(repository.findOneBy).toBeCalledWith({ currency: 'USD' });
    });

    it("should be throw findOneBy return empty", async () => {
      repository.findOneBy = jest.fn().mockReturnValue(undefined);
      await expect(repository.getCurrency('USD')).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it("should be returns when findOneBy returns", async () => {
      const mockData = { currency: 'USD', value: 1 };
      repository.findOneBy = jest.fn().mockReturnValue(mockData as Currencies);
      expect(await repository.getCurrency('USD')).toEqual(mockData);
    });
  });
})
