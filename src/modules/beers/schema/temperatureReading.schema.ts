import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { Beer } from './beer.schema';

export type TemperatureReadingDocument = HydratedDocument<TemperatureReading>;

@Schema({ timestamps: true })
export class TemperatureReading {
  @Prop({ type: Types.ObjectId, ref: 'Beer' })
  beer: Beer;

  @Prop({ type: Number })
  temperature: number;
}

export const TemperatureReadingSchema =
  SchemaFactory.createForClass(TemperatureReading);
