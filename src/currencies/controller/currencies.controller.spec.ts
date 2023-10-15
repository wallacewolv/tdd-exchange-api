import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Currencies } from '../entity/currencies.entity';
import { CurrenciesService } from '../service/currencies.service';
import { CurrenciesController } from './currencies.controller';

describe('CurrenciesController', () => {
  let controller: CurrenciesController;
  let service: CurrenciesService;
  let mockData = {} as Currencies;

  beforeEach(async () => {
    const mockService = {
      getCurrency: jest.fn(),
      createCurrency: jest.fn(),
      deleteCurrency: jest.fn(),
      updateCurrency: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      providers: [
        {
          provide: CurrenciesService,
          useFactory: () => (mockService)
        }
      ]
    }).compile();

    controller = module.get<CurrenciesController>(CurrenciesController);
    service = module.get<CurrenciesService>(CurrenciesService);
    mockData = { currency: 'USD', value: 1 } as Currencies;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCurrency()', () => {
    it('should be throw when service throw', async () => {
      (service.getCurrency as jest.Mock).mockRejectedValue(new BadRequestException());
      await expect(controller.getCurrency('INVALID')).rejects.toThrow(new BadRequestException());
    });

    it('should be called when service with params', async () => {
      await controller.getCurrency('USD');
      expect(service.getCurrency).toBeCalledWith('USD');
    });

    it('should be return if service return', async () => {
      (service.getCurrency as jest.Mock).mockResolvedValue(mockData);
      expect(await controller.getCurrency('USD')).toEqual(mockData);
    });
  });

  describe('createCurrency()', () => {
    it('should be throw when service throw', async () => {
      (service.createCurrency as jest.Mock).mockRejectedValue(new BadRequestException());
      await expect(controller.createCurrency(mockData)).rejects.toThrow(new BadRequestException());
    });

    it('should be called when service with params', async () => {
      await controller.createCurrency(mockData);
      expect(service.createCurrency).toBeCalledWith(mockData);
    });

    it('should be return if service return', async () => {
      (service.createCurrency as jest.Mock).mockResolvedValue(mockData);
      expect(await controller.createCurrency(mockData)).toEqual(mockData);
    });
  });

  describe('deleteCurrency()', () => {
    it('should be throw when service throw', async () => {
      (service.deleteCurrency as jest.Mock).mockRejectedValue(new BadRequestException());
      await expect(controller.deleteCurrency('INVALID')).rejects.toThrow(new BadRequestException());
    });

    it('should be called when service with params', async () => {
      await controller.deleteCurrency('USD');
      expect(service.deleteCurrency).toBeCalledWith('USD');
    });
  });

  describe('updateCurrency()', () => {
    it('should be throw when service throw', async () => {
      (service.updateCurrency as jest.Mock).mockRejectedValue(new BadRequestException());
      await expect(controller.updateCurrency('USD', 1)).rejects.toThrow(new BadRequestException());
    });

    it('should be called when service with params', async () => {
      await controller.updateCurrency('USD', 1);
      expect(service.updateCurrency).toBeCalledWith(mockData);
    });

    it('should be return if service return', async () => {
      (service.updateCurrency as jest.Mock).mockResolvedValue(mockData);
      expect(await controller.updateCurrency('USD', 1)).toEqual(mockData);
    });
  });
});
