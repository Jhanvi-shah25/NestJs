import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, ParseFilePipeBuilder, UploadedFiles, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, updatePasswordRequest } from './dto/create-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './file-upload';
import { Public } from 'src/security/auth/auth.decorator';
import * as fs from 'fs';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('getAll')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('update/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return {data : response,status : {code : 'OK' ,message : 'Profile photo uploaded successfully'}}
    }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Public()
  @Get('view/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files'});
  }

  // @Public()
  // @Get('delete/:imgpath')
  // deleteUploadedFile(@Param('imgpath') image,@Res() res){
  //   console.log('successfully deleted');
  //   const response = fs.unlink(`/home/agilepc119/Downloads/nestjsDemo/xcode-nestjs/files/${image}`,(err)=>{
  //     if(err){
  //       console.log(err);
  //       return {error : err,message:"Invalid url"};
  //     }
  //   })
  //   return {data : response,status : {code : "OK" , message : "Profile photo deleted successfully"}}
  // }

  @Public()
  @Get('delete-profile/:id')
  deleteProfile(@Param('id') userId : string){
    return this.usersService.deleteIndividualProfile(userId);
  }

  @Post('reset/password')
  changePassword(@Body() updatePassword: updatePasswordRequest){

  }


}
