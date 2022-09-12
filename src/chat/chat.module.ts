import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'src/common/logger/logger.module';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ConfigModule } from '@nestjs/config';


import { Chat, ChatSchema } from './schemas/chatmessage.schema';
@Module({
    imports: [
        MongooseModule.forFeature([{ name : Chat.name , schema : ChatSchema}]),
        LoggerModule,
        ConfigModule.forRoot({envFilePath : '.env'}),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('auth.secret'),
                signOptions: {
                expiresIn: configService.get<number>('auth.expiresIn', 60),
                },
            }),
        }),
    ],
    controllers:[ChatController],
    providers:[ChatService,ChatGateway],
    exports:[ChatService]
})
export class ChatModule {}
