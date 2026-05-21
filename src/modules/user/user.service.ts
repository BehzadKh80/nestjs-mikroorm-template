import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { ClsService } from 'nestjs-cls';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
@Injectable()
export class UserService {
  constructor(
    @InjectPinoLogger(UserService.name)
    private readonly logger: PinoLogger,
    private readonly clsService: ClsService,
    private readonly em: EntityManager,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exist = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (exist) {
      this.logger.warn(
        {
          requestId: this.clsService.get('requestId'),
        },
        'some user exists',
      );
      throw new NotAcceptableException('user is exists');
    }
    const newUser = this.userRepository.create(createUserDto);
    await this.em.flush();
    return newUser;
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
