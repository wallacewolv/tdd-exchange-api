import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CurrenciesService, ExchangeService } from './exchange.service';
import { ExchangeInputType } from './types/exchange-input.type';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesService: CurrenciesService;
  let getCurrency;
  let mockData: ExchangeInputType;

  beforeEach(async () => {
    const currenciesServiceMock = {
      getCurrency: jest.fn().mockReturnValue({ value: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        { provide: CurrenciesService, useFactory: () => currenciesServiceMock },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currenciesService = module.get<CurrenciesService>(CurrenciesService);
    getCurrency = currenciesService.getCurrency;
    mockData = { from: 'USD', to: 'BRL', amount: 1 } as ExchangeInputType;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertAmount()', () => {
    it('should be throw if called with invalid params', async () => {
      mockData.from = '';
      await expect(service.convertAmount(mockData)).rejects.toThrow(
        new BadRequestException(),
      );

      mockData.from = 'USD';
      mockData.amount = 0;
      await expect(service.convertAmount(mockData)).rejects.toThrow(
        new BadRequestException(),
      );

      mockData = { from: 'USD', to: '', amount: 1 };
      await expect(service.convertAmount(mockData)).rejects.toThrow(
        new BadRequestException(),
      );
    });

    it('should be not throw if called with valid params', async () => {
      await expect(service.convertAmount(mockData)).resolves.not.toThrow();
    });

    it('should be called getCurrency twice', async () => {
      await service.convertAmount(mockData);
      expect(getCurrency).toHaveBeenCalledTimes(2);
    });

    it('should be called getCurrency with correct params', async () => {
      await service.convertAmount(mockData);
      expect(getCurrency).toHaveBeenCalledWith('USD');
      expect(getCurrency).toHaveBeenLastCalledWith('BRL');
    });

    it('should be throw when called getCurrency throw', async () => {
      (getCurrency as jest.Mock).mockRejectedValue(new Error());
      mockData.from = 'INVALID';
      await expect(service.convertAmount(mockData)).rejects.toThrow();
    });

    it('should be return conversion value', async () => {
      // 1 USD, 1 USD -> 1 USD
      (getCurrency as jest.Mock).mockResolvedValue({ value: 1 });
      mockData.from = 'USD';
      mockData.to = 'USD';
      expect(await service.convertAmount(mockData)).toEqual({ amount: 1 });

      // 1 USD, 0.2 BRL -> 5 BRL
      (getCurrency as jest.Mock).mockResolvedValueOnce({ value: 1 });
      (getCurrency as jest.Mock).mockResolvedValueOnce({ value: 0.2 });
      mockData.from = 'USD';
      mockData.to = 'BRL';
      expect(await service.convertAmount(mockData)).toEqual({ amount: 5 });

      //  0.2 BRL, 1 USD -> 0.2 BRL
      (getCurrency as jest.Mock).mockResolvedValueOnce({ value: 0.2 });
      (getCurrency as jest.Mock).mockResolvedValueOnce({ value: 1 });
      mockData.from = 'BRL';
      mockData.to = 'USD';
      expect(await service.convertAmount(mockData)).toEqual({ amount: 0.2 });
    });
  });
});
