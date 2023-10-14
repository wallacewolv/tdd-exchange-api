import { Module } from '@nestjs/common';

import { CurrenciesController } from './controller/currencies.controller';
import { CurrenciesService } from './service/currencies.service';

@Module({
  providers: [CurrenciesService],
  controllers: [CurrenciesController],
  exports: [CurrenciesService]
})
export class CurrenciesModule {}
