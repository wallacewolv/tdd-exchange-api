import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';

import { Currencies } from '../entity/currencies.entity';
import { CurrenciesInputType } from '../types/currencies-input.type';

@EntityRepository(Currencies)
export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOneBy({ currency });

    if (!result) {
      throw new InternalServerErrorException();
    }

    return result;
  }

  async createCurrency(currenciesInput: CurrenciesInputType): Promise<Currencies> {
    const createCurrency = new Currencies();
    createCurrency.currency = currenciesInput.currency;
    createCurrency.value = currenciesInput.value;

    try {
      await validateOrReject(createCurrency);
      await this.save(createCurrency);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return createCurrency;
  }

  async updateCurrency({ currency, value }: CurrenciesInputType): Promise<Currencies> {
    const result = await this.findOneBy({ currency });

    if (!result) {
      throw new NotFoundException(`The currency ${currency} not found.`);
    }

    try {
      result.value = value;
      await this.save(result);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return result;
  }

  async deleteCurrency(currency: string): Promise<void> {
    const result = await this.findOneBy({ currency });

    if (!result) {
      throw new NotFoundException(`The currency ${currency} not found.`);
    }

    try {
      await this.delete({ currency });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
