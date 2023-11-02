import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  itemId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsBoolean()
  hidden: boolean;
}
