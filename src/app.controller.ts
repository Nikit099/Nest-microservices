import { signInUserDto } from './dto/signIn-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './app.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body() createUser: CreateUserDto){
    return this.authService.signUp(createUser);
  }
  @Post('/signInWithPassword')
  signInWithPassword(@Body() signInUser: signInUserDto){
    return this.authService.signInWithPassword(signInUser);
  }
 
}
