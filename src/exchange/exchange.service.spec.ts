import { Test, TestingModule } from '@nestjs/testing';
import { Amount, CurrenciesService, ExchangeService } from './exchange.service';
import { BadRequestException } from '@nestjs/common';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesService: CurrenciesService;

  beforeEach(async () => {
    const currenciesServiceMock = { getCurrency: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        { provide: CurrenciesService, useFactory: () => currenciesServiceMock },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currenciesService = module.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertAmount()', () => {
    it('should be throw if called with invalid params', async () => {
      const value: Amount = { from: '', to: '', amount: '' };
      await expect(service.convertAmount(value)).rejects.toThrow(
        new BadRequestException(),
      );
    });

    it('should be not throw if called with valid params', async () => {
      const value: Amount = { from: 'USD', to: 'BRL', amount: '1' };
      await expect(service.convertAmount(value)).resolves.not.toThrow();
    });

    it('should be called getCurrency twice', async () => {
      const value: Amount = { from: 'USD', to: 'BRL', amount: '1' };
      await service.convertAmount(value);
      await expect(currenciesService.getCurrency).toHaveBeenCalledTimes(2);
    });
  });
});
