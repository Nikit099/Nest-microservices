import { UpdateCommentDto } from './dto/update-comment.dto';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDocument, Comment } from './schemas/comment.schema'; 
import { Model } from 'mongoose';
@Injectable()
export class CommentService {
  constructor(  @Inject('comment_service') private client: ClientProxy, @InjectModel('comments') private commentModel: Model<CommentDocument>) {
  }
 async getAll(): Promise<Observable<Comment[]>> {
  const pattern = {cmd: 'getAll'}
  const payload = await this.commentModel.find().exec() 
  return this.client.send(pattern, payload );
 }
 async create(commentDto: CreateCommentDto): Promise<Observable<string>> {
  const newComment = new this.commentModel(commentDto)
  await newComment.save()
  const pattern = {cmd: 'create'}
  const payload = 'Comment has been pushed...' 
  return this.client.send(pattern, payload);
 }
 async remove(id: string): Promise<Observable<Comment>>{
  const removeComment = await this.commentModel.findByIdAndRemove(id)
  const pattern = {cmd: 'remove'}
  return this.client.send(pattern, removeComment)
 }
  async getOne(id: string): Promise<Observable<Comment>>{
    const getComment = await this.commentModel.findById(id)
    const pattern = {cmd: 'getOne'}
    return this.client.send(pattern, getComment)
  }
  async update(commentDto: UpdateCommentDto, id: string): Promise<Observable<string>> {
     await this.commentModel.findByIdAndUpdate(id, commentDto, {new: true})
     const pattern = {cmd: 'update'}
     const payload = 'Comment has been update...' 
     return this.client.send(pattern, payload)
  }
}
