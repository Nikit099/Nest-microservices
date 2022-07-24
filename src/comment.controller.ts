import {  CommentService } from './comment.service';
import { Controller, Get, HttpCode, HttpStatus, Post, Header, Body, Delete, Param, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import {  Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
   
  @Get()
  getAll(): Promise<Observable<Comment[]>>  {
      return this.commentService.getAll()
  }
  @Get(':id')
  getOne(@Param() id: string): Promise<Observable<Comment>>{
    return this.commentService.getOne(id)
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() commentDto: CreateCommentDto): Promise<Observable<string>>  {
      return this.commentService.create(commentDto)
    }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Observable<Comment>>{
    return this.commentService.remove(id)
  }
  @Put(':id')
  updated(@Body() updateCommentDto: UpdateCommentDto, @Param('id') id: string): Promise<Observable<string>>  {
    return this.commentService.update(updateCommentDto, id)
  }
}
