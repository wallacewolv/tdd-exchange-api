import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateCurrencyDto } from '../dto/create-currency.dto';
import { Currencies } from '../entity/currencies.entity';
import { CurrenciesService } from '../service/currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) { }

  @Get('/:currency')
  async getCurrency(@Param('currency') currency: string): Promise<Currencies> {
    return await this.currenciesService.getCurrency(currency);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCurrency(@Body() createCurrencyDto: CreateCurrencyDto): Promise<Currencies> {
    return await this.currenciesService.createCurrency(createCurrencyDto);
  }
}

