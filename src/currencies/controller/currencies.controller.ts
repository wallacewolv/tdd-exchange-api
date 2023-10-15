import { Controller, Get, Param } from '@nestjs/common';
import { Currencies } from '../entity/currencies.entity';
import { CurrenciesService } from '../service/currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) { }

  @Get('/:currency')
  async getCurrency(@Param('currency') currency: string): Promise<Currencies> {
    return await this.currenciesService.getCurrency(currency);
  }
}

