import { Module } from '@nestjs/common';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Beer, BeerSchema } from './schema/beer.schema';
import {
  TemperatureReading,
  TemperatureReadingSchema,
} from './schema/temperatureReading.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Beer.name, schema: BeerSchema },
      { name: TemperatureReading.name, schema: TemperatureReadingSchema },
    ]),
  ],
  controllers: [BeersController],
  providers: [BeersService],
})
export class BeersModule {}
