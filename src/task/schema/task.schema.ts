import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import * as schema from 'mongoose';

export type TaskDocument = Task & Document;
export type AssignTaskDocument = taskRelation & Document;

@Schema({ collection: 'task', timestamps: true })
export class Task {
    @Prop({ required: true })
    taskName: string;

    @Prop({ required: true })
    taskDescription: string;


    // userId : [{
    //     type : schema.Types.ObjectId, ref : 'users'
    // }]
}

@Schema({collection : 'task_ref',timestamps:true})
export class taskRelation{

    @Prop({type : schema.Types.ObjectId,ref:'users'})
    @IsMongoId()
    userId : [string];

    @Prop({type : schema.Types.ObjectId,ref:'task'})
    @IsMongoId()
    taskId : string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);
export const MasterTaskSchema = SchemaFactory.createForClass(taskRelation);