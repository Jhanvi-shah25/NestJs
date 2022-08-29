import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { throwError } from 'rxjs';
import { CustomError } from 'src/common/helpers/exceptions';
import { sucessResponse } from 'src/common/helpers/responses/success.helper';
import { LoggerService } from 'src/common/logger/logger.service';
import { createTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './schema/task.schema';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel : Model<TaskDocument>,
    private myLogger: LoggerService){
        this.myLogger.setContext(TaskService.name);
    }

    async createNewTask(taskDto : createTaskDto){
        console.log(taskDto,this.taskModel)
        try{
            await this.taskModel.create(taskDto);
            return sucessResponse.CREATED;
        }
        catch(error){
            if(error?.response?.error){
                throw error
            }
            else{
                throw CustomError.UnknownError(error?.message);
            }
        }
    }

    async getAllTask(){
        return await this.taskModel.find().lean();
    }

    async getSingleTask(taskId : string){
       return await this.taskModel.findOne({
            _id : taskId
        }).lean();
    }

    async updateTask(taskId : string ,updateTask : createTaskDto){
        try{
            await this.taskModel.updateOne({
                _id : taskId
            },updateTask);

            return sucessResponse.UPDATED;
        }catch(error){
            if(error?.response?.error){
                throw error;
            }else{
                throw CustomError.UnknownError(error?.message);
            }
        }
    }

    async removeTask(taskId : string){
        console.log(taskId)
        try{
            await this.taskModel.deleteOne({
                _id : taskId
            });
            return sucessResponse.DELETED;
        }catch(error){
            if(error?.response?.error){
                throw error;
            }else{
                throw CustomError.UnknownError(error?.message);
            }
        }
    }

    

}
