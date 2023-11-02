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
    return this.wishesRepository.create(createWishlistDto);
  }

  async findAll() {
    return this.wishesRepository.find();
  }

  async findOne(id: number) {
    return this.wishesRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishesRepository.update(id, updateWishlistDto);
  }

  async remove(id: number) {
    this.wishesRepository.delete(id);
  }
}
