import { BadRequestException, Injectable } from '@nestjs/common';

import { Currencies } from './currencies.entity';
import { CurrenciesRepository } from './currencies.repository';

@Injectable()
export class CurrenciesService {
  constructor(private currenciesRepository: CurrenciesRepository) {}

  async getCurrency(currency: string): Promise<Currencies> {
    return await this.currenciesRepository.getCurrency(currency);
  }

  async createCurrency({ currency, value }): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greatest zero.');
    }
    return await this.currenciesRepository.createCurrency({ currency, value });
  }

  async updateCurrency({ currency, value }): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greatest zero.');
    }
    return await this.currenciesRepository.updateCurrency({ currency, value });
  }

  async deleteCurrency(currency: string): Promise<void> {
    return await this.currenciesRepository.deleteCurrency(currency);
  }
}
