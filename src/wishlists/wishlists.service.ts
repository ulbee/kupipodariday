import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishesRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto) {
    return await this.wishesRepository.create(createWishlistDto);
  }

  async findAll() {
    return await this.wishesRepository.find();
  }

  async findOne(id: number) {
    return await this.wishesRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return await this.wishesRepository.update(id, updateWishlistDto);
  }

  async remove(id: number) {
    await this.wishesRepository.delete(id);
  }
}
