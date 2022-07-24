import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User{
    @Prop({required: true})
    name: string
    @Prop({unique: true, required: true})
    email: string
    @Prop({required: true})
    password: string
    @Prop([String])
    qualities: string[]
    @Prop({enum: ["male", "female", "other"]})
    sex: string
}
export const UserSchema = SchemaFactory.createForClass(User)