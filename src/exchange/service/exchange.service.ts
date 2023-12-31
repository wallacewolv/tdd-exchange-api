import { BadRequestException, Injectable } from '@nestjs/common';

import { CurrenciesService } from '../../currencies/service/currencies.service';
import { ExchangeInputType } from '../types/exchange-input.type';
import { ExchangeType } from '../types/exchange.type';

@Injectable()
export class ExchangeService {
  constructor(private currenciesService: CurrenciesService) {}

  async convertAmount({
    from,
    to,
    amount,
  }: ExchangeInputType): Promise<ExchangeType> {
    if (!from || !to || !amount) {
      throw new BadRequestException();
    }

    try {
      const currencyForm = await this.currenciesService.getCurrency(from);
      const currencyTo = await this.currenciesService.getCurrency(to);

      return { amount: (currencyForm.value / currencyTo.value) * amount };
    } catch (error) {
      throw new Error(error);
    }
  }
}
