import { BadRequestException, Injectable } from '@nestjs/common';

export interface Amount {
  from: string;
  to: string;
  amount: number;
}

export class CurrenciesService {
  async getCurrency(currency: string): Promise<any> {
    return currency;
  }
}

@Injectable()
export class ExchangeService {
  constructor(private currenciesService: CurrenciesService) {}

  async convertAmount({ from, to, amount }: Amount): Promise<any> {
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
