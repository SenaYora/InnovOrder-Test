import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService {
  isAlreadyDefined = false;

  _db = {};

  db() {
    if (!this.isAlreadyDefined) {
      this._db = getFirestore();
      this.isAlreadyDefined = true;
    }

    return this._db as FirebaseFirestore.Firestore;
  }
}
