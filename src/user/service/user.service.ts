import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { user } from '../models/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(userEntity)
        private readonly userRepository: Repository<userEntity>,
        private jwtService: JwtService
    ) { }


    async getUsers() {
        const data = await this.userRepository.find()
        return data;
    }

    createUser(user: user) {
        return this.userRepository.save(user);
    }

    updateUser(id: number, user: user) {
        return this.userRepository.update(id, user)
    }

    getUser(id: number) {
        return this.userRepository.findOneBy({ id: id });
    }


    deleteUser(id: number) {
        return this.userRepository.delete(id);
    }

    async logInUser(user) {
        const validUser = await this.userRepository.findOneBy({ email: user.email })
        if (!validUser) {
            return { error: "Error" }
        }
        const isMatch = await bcrypt.compare(user.password, validUser.password);
        if (!isMatch) {
            return { error: "Error" }
        }
        const payload = { id: validUser.id, email: validUser.email };
        const token = await this.jwtService.signAsync(payload)
        if(!token){
            return { error: "Error" }
        }
        return { token: token };
    }

}
