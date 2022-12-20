import { Body, Controller, Get, Param, Post, Query, Req, Res, UsePipes, ValidationPipe, HttpException,HttpStatus, UseGuards } from '@nestjs/common';
import { ParseBoolPipe, ParseIntPipe } from '@nestjs/common/pipes';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    getUsers() {
       return this.userService.fetchUsers();
    }

    @Get("posts")
    getUsersPosts() {
        return [
            {
                username: "Anthony",
                email: "anthony@nest.com",
                posts: [
                    {
                        id: 1,
                        title: 'Post 1'
                    },
                    {
                        id: 1,
                        title: 'Post 2'
                    },
                    {
                        id: 1,
                        title: 'Post 3'
                    },
                ]
            }
        ]
    }

    @Get("posts/comments")
    getUserPostsComments() {
        return[
            {
                id: 1,
                title: "Post 1",
                comments: [],
            }
        ]
    }


    // @Post("")
    // createUser(@Req() request: Request , @Res() response: Response){
    //     console.log(request.body);
    //     response.send("created");
    // }

    @Post("create")
    @UsePipes(new ValidationPipe())
    createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto){
        console.log(userData.age.toPrecision());
        return this.userService.createUser(userData);
        
    }

    @Get(":id")
    getUserById(@Param("id", ParseIntPipe) id: number) {
        console.log(id);
        const user = this.userService.fetchUserById(id);
        if(!user){
            throw new HttpException("User Not Found", HttpStatus.BAD_REQUEST)
        }

        return user;
    }
}
