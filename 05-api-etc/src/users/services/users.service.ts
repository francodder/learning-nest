import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const userToSave = {
      ...createUserDto,
      authState: "pending-verification",
      state: "created",
      rol: "USER_ROLE",
      createdAt: new Date().toISOString(),
    };

    try {
      const user = await this.userRepository.save(userToSave);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  findAll() {
    console.log(new Date());
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
