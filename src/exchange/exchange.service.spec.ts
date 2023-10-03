import { Test, TestingModule } from '@nestjs/testing';
import { Amount, ExchangeService } from './exchange.service';
import { BadRequestException } from '@nestjs/common';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
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
  });
});
