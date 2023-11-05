import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    this.logger = new Logger(UsersController.name);
  }

  private readonly logger: Logger;

  // @Get()
  // async findAll() {
  //   return await this.usersService.findAll();
  // }

  @Get('me')
  async showUserProfile(@Req() req) {
    const user = await this.usersService.findOne(+req.user.id);
    delete user.password;

    return user;
  }

  @Patch('me')
  async editUserProfile(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    const user = await this.usersService.update(+req.user.id, updateUserDto);
    delete user.password;
    return user;
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    delete user.password;

    return user;
  }

  /////////////////////////////////////

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
