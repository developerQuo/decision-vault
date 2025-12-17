import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

export interface CreateNoticeDto {
  title: string;
  content: string;
}

@Injectable()
export class NoticeBoardService {
  private db: admin.firestore.Firestore;

  constructor(
    @Inject('FIREBASE_APP') private firebaseApp: admin.app.App,
  ) {
    this.db = firebaseApp.firestore();
  }

  async create(createNoticeDto: CreateNoticeDto) {
    const docRef = await this.db.collection('notice-board').add({
      ...createNoticeDto,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { id: docRef.id, ...createNoticeDto };
  }
}
