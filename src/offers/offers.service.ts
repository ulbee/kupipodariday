import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto) {
    return await this.offersRepository.save(createOfferDto);
  }

  async findAll() {
    return await this.offersRepository.find();
  }

  async findOne(id: number) {
    return await this.offersRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    return await this.offersRepository.update(id, updateOfferDto);
  }

  async remove(id: number) {
    await this.offersRepository.delete(id);
  }
}
