import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Request } from "express";

import { LoginDto } from "../dto/login.dto";
import { Session, User } from "../entities";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, @InjectRepository(Session) private readonly sessionRepository: Repository<Session>) {}

  async login(loginDto: LoginDto, req: Request) {
    /* TODO: verify auth */
    const { email, password } = loginDto;

    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException(`Cant find user with email ${email}`);

    const sessionToSave: Session = {
      userId: user.id,
      loggedAt: new Date().toISOString(),
      ipAddress: req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress,
      /* TODO: Get real location */
      location: "Cordoba, Argentina",
      /* TODO: Get real device */
      device: req.headers["user-agent"] || "Samsung Q3",
      state: "online",
      loggedOutAt: null,
    };

    try {
      const session = this.sessionRepository.save(sessionToSave);
      return session;
    } catch (error) {
      /* TODO: Handle errors  */

      console.log(error);
      throw new Error(error);
    }
  }
}
