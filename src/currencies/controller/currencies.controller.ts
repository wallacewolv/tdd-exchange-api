import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';

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

  @Delete('/:currency')
  async deleteCurrency(@Param('currency') currency: string): Promise<void> {
    return await this.currenciesService.deleteCurrency(currency);
  }

  @Patch('/:currency/value')
  async updateCurrency(@Param('currency') currency: string, @Body('value') value: number): Promise<Currencies> {
    return await this.currenciesService.updateCurrency({ currency, value });
  }
}
