import { constants } from './constants';
import { TokenSchema } from './schemas/token.schema';
import { UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'auth_service',
      transport: Transport.TCP,
     
    },
  ]),
  MongooseModule.forRoot(constants.mongoUri),
  MongooseModule.forFeature([
    {name: 'users', schema: UserSchema}
  ]),
  MongooseModule.forFeature([
    {name: 'tokens', schema: TokenSchema}
  ]),
 
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
