import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto) {
    this.wishesRepository.create(createWishDto);
  }

  async findAll() {
    return this.wishesRepository.find();
  }

  async findOne(id: number) {
    return this.wishesRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    return this.wishesRepository.update(id, updateWishDto);
  }

  async remove(id: number) {
    this.wishesRepository.delete(id);
  }
}
