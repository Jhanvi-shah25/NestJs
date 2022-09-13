import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chatmessage.dto';


// chat/create

@Controller('chat')
@ApiTags('chatInfo')
@ApiBearerAuth()
export class ChatController {

    constructor(private chatService : ChatService){}

    @Post('/create')
    createChat(@Body() chat : ChatDto){
        return this.chatService.saveData(chat);
    }

    @Get('/getMessages')
    getAllData(){
        return this.chatService.getChats()
    }

    @Get('/getSingle/:id')
    getSingle(@Param('id') id : string){
        return this.chatService.getSingleInfo(id);
    }

}
