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
    return await this.wishesRepository.create(createWishDto);
  }

  async findAll() {
    return await this.wishesRepository.find();
  }

  async findOne(id: number) {
    return await this.wishesRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    return await this.wishesRepository.update(id, updateWishDto);
  }

  async remove(id: number) {
    await this.wishesRepository.delete(id);
  }
}
