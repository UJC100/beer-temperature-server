import { Body, Controller, Get, Post } from '@nestjs/common';
import { BeersService } from './beers.service';
import { Beer } from './schema/beer.schema';
import { CreateBeerDto } from './dto/beers.dto';

@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  async findAll(): Promise<Beer[]> {
    const beers = await this.beersService.getAllBeersWithTemp();
    return beers.map((beer) => ({
      name: beer.name,
      currentTemp: beer.currentTemp,
      isInRange: beer.isInRange,
      tempRange: beer.tempRange,
      image: beer.image,
    }));
  }

  @Post()
  async create(@Body() createBeerDto: CreateBeerDto): Promise<Beer> {
    return await this.beersService.createBeer(createBeerDto);
  }
}
