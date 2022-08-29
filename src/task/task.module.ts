import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'src/common/logger/logger.module';
import { Task, TaskSchema } from './schema/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    LoggerModule
  ],
  controllers:[TaskController],
  providers: [TaskService],
  exports : [TaskService]
})
export class TaskModule {
  
}
