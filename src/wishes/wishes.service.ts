import {
  ForbiddenException,
  NotFoundException,
  Injectable,
  Logger,
} from '@nestjs/common';
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
  ) {
    this.logger = new Logger(WishesService.name);
  }
  private readonly logger: Logger;

  async create(createWishDto: CreateWishDto, userId) {
    return await this.wishesRepository.insert({
      ...createWishDto,
      owner: userId,
    });
  }

  async findWishBiId(id: number) {
    return await this.wishesRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  async updateWishById(
    id: number,
    updateWishDto: UpdateWishDto,
    userId: number,
  ) {
    const wish = await this.findWishBiId(id);

    if (!wish) {
      throw new NotFoundException('Такого подарка не существует');
    }
    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Вы не можете редактировать чужие подарки');
    }
    //TODO проверить!!!
    if (wish.raised > 0 && updateWishDto.price) {
      throw new ForbiddenException(
        'Вы не можете редактировать цену, если уже есть желающие скинуться',
      );
    }

    return await this.wishesRepository.update(id, updateWishDto);
  }

  async deleteWishById(id: number, userId: number) {
    const wish = await this.findWishBiId(id);

    if (!wish) {
      throw new NotFoundException('Такого подарка не существует');
    }
    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Вы не можете удалять чужие подарки');
    }

    await this.wishesRepository.delete(id);
    return wish;
  }

  // //////////////////////////////
  async findAll() {
    return await this.wishesRepository.find();
  }
}
