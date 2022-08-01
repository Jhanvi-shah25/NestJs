import { Body, Controller, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { LoginDto } from 'src/common/dto/common.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';

@Controller('auth')
@ApiTags('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @UsePipes(new ValidationPipe({ transform: true }))
    @Post('/login')
    async login(@Body() params: LoginDto): Promise<any> {
        return await this.authService.login(params);
    }
}

