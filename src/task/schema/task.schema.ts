import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as schema from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ collection: 'task', timestamps: true })
export class Task {
    @Prop({ required: true })
    taskName: string;

    @Prop({ required: true })
    taskDescription: string;

    // @Prop({ required: true })
    // deadline: Date;

    
    userId : [{
        type : schema.Types.ObjectId, ref : 'users'
    }]
}

export const TaskSchema = SchemaFactory.createForClass(Task);