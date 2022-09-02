import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsEmail, IsBoolean, IsDate, IsArray } from "class-validator";
import { ObjectId, Schema } from "mongoose";
export class createTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskDescription: string;
}


export class assignTask{
    @ApiProperty()
    userId : [string]
    @ApiProperty()
    taskId : string
}