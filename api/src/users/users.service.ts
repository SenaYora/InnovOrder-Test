import { ForbiddenException, Injectable } from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { DocumentSnapshot } from 'firebase-admin/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private firebase: FirebaseService) {}

  async findAll(): Promise<IUser[]> {
    const usersRef = this.firebase.db().collection('users');
    const snapshot = await usersRef.get();
    const users: any[] = [];

    snapshot.forEach((doc: DocumentSnapshot) => {
      users.push(doc.data());
    });

    return users;
  }

  async find(id: string): Promise<IUser> {
    const userRef = this.firebase.db().collection('users').doc(id);
    const doc = await userRef.get();

    return doc.data() as IUser;
  }

  async create(userDto: CreateUserDto): Promise<IUser> {
    const usersRef = this.firebase.db().collection('users');
    const doc = await usersRef.doc(userDto.username).get();
    const userAlreadyExist = doc.exists;

    if (userAlreadyExist) {
      throw new ForbiddenException();
    }

    const user: IUser = {
      username: userDto.username,
      password: await bcrypt.hash(userDto.password, await bcrypt.genSalt()),
    };

    await usersRef.doc(userDto.username).set(user);

    return user;
  }
}
