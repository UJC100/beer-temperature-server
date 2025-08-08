import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Beer, BeerDocument } from './schema/beer.schema';
import { Model } from 'mongoose';
import {
  TemperatureReading,
  TemperatureReadingDocument,
} from './schema/temperatureReading.schema';

@Injectable()
export class BeersService {
  constructor(
    @InjectModel(Beer.name) private beerModel: Model<BeerDocument>,
    @InjectModel(TemperatureReading.name)
    private temperatureModel: Model<TemperatureReadingDocument>,
  ) {}

  async createBeer(beerData: Partial<Beer>): Promise<Beer> {
    const createdBeer = await this.beerModel.create(beerData);
    return createdBeer;
  }

  async getAllBeersWithTemp(): Promise<Beer[]> {
    const beers = await this.beerModel.find();

    for (const beer of beers) {
      const temp = this.generateRandomTemp();
      const isInRange =
        temp >= beer.tempRange.min && temp <= beer.tempRange.max;

      // Save to historical readings
      await this.temperatureModel.create({ beer: beer._id, temperature: temp });

      // Update beer current temp
      beer.currentTemp = temp;
      beer.isInRange = isInRange;
      await beer.save();
    }

    return beers;
  }

  generateRandomTemp(): number {
    return +(Math.random() * 7).toFixed(1);
  }
}
