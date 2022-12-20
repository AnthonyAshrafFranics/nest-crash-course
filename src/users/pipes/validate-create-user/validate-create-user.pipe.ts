import { ArgumentMetadata, Injectable,HttpException, PipeTransform,HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log("Inside ValidateCreateUserPipe");
    console.log(value);
    console.log(metadata);

    const parseAgeToInt = parseInt(value.age.toString());
    if(isNaN(parseAgeToInt)){
      console.log(`${value.age} is not a number`);
      throw new HttpException("Invalid Data Type for Property Age", HttpStatus.BAD_REQUEST)
    } 
    console.log(`${parseAgeToInt} is a Number`)
    return { ...value, age: parseAgeToInt }    
  }
}
