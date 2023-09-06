import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { user } from '../models/user.interface';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('all')
    getUsers() {
        return this.userService.getUsers()
    }


    @Post()
    async create(@Body() user: user) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hash;
        return this.userService.createUser(user)
    }

    @Put(':id')
    userUpdate(
        @Param('id') id: number,
        @Body() user: user
    ) {
        return this.userService.updateUser(id, user);
    }

    @Get(':id')
    getUser(
        @Param('id') id: number
    ) {
        return this.userService.getUser(id);
    }

    @Delete(':id')
    deleteUser(
        @Param('id') id: number
    ) {
        return this.userService.deleteUser(id);
    }
    
    @Post('login')
    logInUser(@Body() logIndata : Record<string, any>){
        return this.userService.logInUser(logIndata);
    }

}
