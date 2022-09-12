import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';



@Controller('chat')
@ApiTags('chatInfo')
@ApiBearerAuth()
export class ChatController {

    constructor(private chatService : ChatService){}

    // @Post('/create')
    // createChat(@Body() chat : ChatDto){

    // }

}
