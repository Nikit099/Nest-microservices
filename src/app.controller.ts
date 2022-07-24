import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @MessagePattern({cmd: 'getAll'})
  getAll(data: object[]): object[]  {
    return data
  }
  @MessagePattern({cmd: 'create'})
  create(data: string): string {
    return data
  }
  @MessagePattern({cmd: 'remove'})
  remove(data: object): object {
    return data
  }
  @MessagePattern({cmd: 'getOne'})
  getOne(data: object): object {
    return data
  }
  @MessagePattern({cmd: 'update'})
  update(data: string): string {
    return data
  }
  @MessagePattern({cmd: 'signUp'})
  signUp(data: string): string {
    return data
  }
  @MessagePattern({cmd: 'emailExist'})
  @HttpCode(HttpStatus.UNAUTHORIZED)
  emailExist(data: string): string {
    return data
  }
  @MessagePattern({cmd: 'not_found'})
  @HttpCode(HttpStatus.NOT_FOUND)
  notFound(data: string): string {
    return data
  }
  @MessagePattern({cmd: 'signIn'})
  signIn(data: string): string {
    return data
  }
}
