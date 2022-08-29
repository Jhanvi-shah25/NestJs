import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsEmail, IsBoolean, IsDate, IsArray } from "class-validator";
export class createTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskDescription: string;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsDate()
    // deadline: Date;
    @ApiProperty()
    @IsOptional()
    @IsArray()
    userIds : string[];
}
