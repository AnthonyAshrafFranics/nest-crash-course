import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
    private fakeUsers = [
        {
            username: "Anthony",
            email: "anthony@nest.com"
        },
        {
            username: "Anthony",
            email: "anthony@nest.com"
        },
        {
            username: "Anthony",
            email: "anthony@nest.com"
        }
    ];
    fetchUsers() {
        return this.fakeUsers;
    }

    createUser(userDetails: CreateUserType){
        this.fakeUsers.push(userDetails);
        return {message:"created"};
    }

    fetchUserById(id: number){
        // return {
        //     id,
        //     username: "anthony",
        //     email: 'anthony@test.com'
        // }
        return null;
    }
}
