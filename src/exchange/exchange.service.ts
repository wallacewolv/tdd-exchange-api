import { BadRequestException, Injectable } from '@nestjs/common';

export interface Amount {
  from: string;
  to: string;
  amount: string;
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

    const currencyForm = this.currenciesService.getCurrency(from);
    const currencyTo = this.currenciesService.getCurrency(to);
  }
}
