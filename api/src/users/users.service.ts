import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { DocumentSnapshot } from 'firebase-admin/firestore';
import { FirebaseService } from '../firebase/firebase.service';

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
}
