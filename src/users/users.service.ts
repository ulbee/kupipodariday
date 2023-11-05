import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.logger = new Logger(UsersService.name);
  }

  private readonly logger: Logger;
  private readonly hashSalt = 10;

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.usersRepository.find({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });
    if (userExists.length) {
      throw new ConflictException(
        'Пользователь с таким email или username уже зарегистрирован',
      );
    }

    createUserDto.password = await bcrypt.hash(
      String(createUserDto.password),
      this.hashSalt,
    );

    return await this.usersRepository.save(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneByOrFail({ id });
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('Такого пользователя не существует');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        String(updateUserDto.password),
        this.hashSalt,
      );
    }
    await this.usersRepository.update(id, updateUserDto);

    return await this.usersRepository.findOneByOrFail({ id });
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
