import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as schema from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema({collection:'chatApp',timestamps:true})
export class Chat{

    @Prop({type : schema.Types.ObjectId,ref:'users'})
    sender :string;

    @Prop({type : schema.Types.ObjectId,ref:'users'})
    receiver : string;

    @Prop({ required:true })
    message : string;

    @Prop({ default : false})
    isRead : boolean;
}
export const ChatSchema = SchemaFactory.createForClass(Chat);





