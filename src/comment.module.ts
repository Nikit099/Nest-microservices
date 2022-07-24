import { CommentSchema } from './schemas/comment.schema';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [ ClientsModule.register([
    {
      name: 'comment_service',
      transport: Transport.TCP,
     
    },
  ]),
  MongooseModule.forRoot('mongodb://uxvcrw2h9vqpd742bfnx:yeLQv5KFUtuuqH0N0JBk@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/brnz12te6obimpk?replicaSet=rs0'),
  MongooseModule.forFeature([
    {name: 'comments', schema: CommentSchema}
  ]),
 
],
  controllers: [CommentController],
  providers: [CommentService],
})
export class AppModule {}
