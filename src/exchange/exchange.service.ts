import { BadRequestException, Injectable } from '@nestjs/common';

export interface Amount {
  from: string;
  to: string;
  amount: string;
}

@Injectable()
export class ExchangeService {
  async convertAmount({ from, to, amount }: Amount): Promise<any> {
    if (!from || !to || !amount) {
      throw new BadRequestException();
    }
  }
}
