import { Body, Controller, Post, Request } from "@nestjs/common";

import * as express from "express";

import { LoginDto } from "../dto/login.dto";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() loginDto: LoginDto, @Request() req: express.Request) {
    return this.authService.login(loginDto, req);
  }
}
