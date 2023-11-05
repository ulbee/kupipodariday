import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Wish } from '../wishes/entities/wish.entity';

import { CANT_OFFER_PRICE, CANT_OFFER_MORE } from '../constants/offers';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {
    this.logger = new Logger(OffersService.name);
  }
  private readonly logger: Logger;

  async create(createOfferDto: CreateOfferDto, userId) {
    const wish = await this.wishesRepository.findOne({
      where: {
        id: createOfferDto.item,
      },
      relations: {
        owner: true,
        offers: true,
      },
    });

    if (wish.owner.id === userId) {
      throw new ForbiddenException(CANT_OFFER_PRICE);
    }
    if (createOfferDto.amount > wish.price - wish.raised) {
      throw new BadRequestException(CANT_OFFER_MORE);
    }

    //TODO добавить транзакцию для добавления оффера и обновления поля raised для подарка
    return await this.offersRepository.insert({
      ...createOfferDto,
      user: userId,
      item: wish,
    });
  }

  async findAll() {
    return await this.offersRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.offersRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
  }
}
