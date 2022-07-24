import { TokenDocument } from './schemas/token.schema';
import { UserDocument } from './schemas/user.schema';
import { Inject, Injectable, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const bcrypt = require('bcrypt')
@Injectable()
export class AuthService {
  constructor(  @Inject('auth_service') private client: ClientProxy,  @InjectModel('users') private userModel: Model<UserDocument>) {
  }
 async signUp(createUser) {
  const { email, password} = createUser
  const exitingUser = await this.userModel.findOne({email})
  if(exitingUser){
    const pattern = {cmd: 'emailExist'}
    const payload = 'Такой email уже занят'
    return this.client.send(pattern, payload )
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await this.userModel.create({
    ...createUser,
    password: hashedPassword
  })
  await newUser.save()
  const pattern = {cmd: 'signUp'}
  const payload = 'Вы зарегестрированы'
  return this.client.send(pattern, payload );
  }
  async signInWithPassword(signInUser){
  const { email, password} = signInUser

  const exitingUser = await this.userModel.findOne({email})
  if(!exitingUser){
    const pattern = {cmd: 'not_found'}
    const payload = 'Неправильный email'
    return this.client.send(pattern, payload )
  }
  const isPasswordEqual = await bcrypt.compare(
    password,
    exitingUser.password
  )
  if (!isPasswordEqual){
    const pattern = {cmd: 'not_found'}
    const payload = 'Неправильный пароль'
    return this.client.send(pattern, payload )
  }
  const pattern = {cmd: 'signUp'}
  const payload = 'Вы зашли'
  return this.client.send(pattern, payload );
  }
}
