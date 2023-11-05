import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  InternalServerErrorException,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  async create(@Body() createWishDto: CreateWishDto, @Req() req) {
    const wish = await this.wishesService.create(createWishDto, req.user.id);
    if (!wish.raw.length) {
      throw new InternalServerErrorException();
    }
    return {};
  }

  @Get(':id')
  async findWishBiId(@Param('id') id: string) {
    return await this.wishesService.findWishBiId(+id);
  }

  @Patch(':id')
  async updateWishById(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req,
  ) {
    await this.wishesService.updateWishById(+id, updateWishDto, req.user.id);

    return {};
  }

  @Delete(':id')
  deleteWishById(@Param('id') id: string, @Req() req) {
    return this.wishesService.deleteWishById(+id, req.user.id);
  }

  /////////////////////////
  @Get()
  findAll() {
    return this.wishesService.findAll();
  }
}
