import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class ChatDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    sender : string;

        
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    receiver : string;

        
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isRead : boolean;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message : string;
}

//new update dto for chat message

// export interface MessageI {
//     id?: number;
//     text: string;
//     user: UserI;
//     room: RoomI;
//     created_at: Date;
//     updated_at: Date;
//   }