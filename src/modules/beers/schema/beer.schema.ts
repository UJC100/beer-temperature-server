import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BeerDocument = HydratedDocument<Beer>;

@Schema({ _id: false })
export class TempRange {
  @Prop({ required: true })
  min: number;

  @Prop({ required: true })
  max: number;
}

const TempRangeSchema = SchemaFactory.createForClass(TempRange);

@Schema({ timestamps: true })
export class Beer {
  @Prop({ required: true })
  name: string;

  @Prop({ type: TempRangeSchema, required: true })
  tempRange: TempRange;

  @Prop()
  image: string;

  @Prop({ type: Number })
  currentTemp: number; // simulated temp

  @Prop({ type: Boolean })
  isInRange: boolean;
}

export const BeerSchema = SchemaFactory.createForClass(Beer);
