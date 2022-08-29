import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { createTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
@ApiTags('task')
@ApiBearerAuth()
export class TaskController {

    constructor(private taskService : TaskService){}

    @Post('add-task')
    createTask(@Body() taskDto : createTaskDto){
        return this.taskService.createNewTask(taskDto);
    }

    @Get('getAll')
    getAllTaskList(){
        return this.taskService.getAllTask();
    }

    @Get('getSingleTask/:id')
    getSingleTaskList(@Param('id') taskId:string){
        return this.taskService.getSingleTask(taskId);
    }

    @Post('updateTask/:id')
    @UsePipes(new ValidationPipe({transform : true}))
    updateTaskInfo(@Param('id') taskId : string ,@Body() updateTask : createTaskDto){
        return this.taskService.updateTask(taskId,updateTask);
    }

    @Delete('removeTask/:id')
    removeSingleTask(@Param('id') taskId : string){
        return this.taskService.removeTask(taskId);
    }


}
