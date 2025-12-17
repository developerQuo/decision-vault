import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(pageSize: number = 20, lastCreatedAt?: string) {
    let query = this.db
      .collection('notice-board')
      .orderBy('createdAt', 'desc')
      .limit(pageSize);

    if (lastCreatedAt) {
      // Decode the cursor if needed, or assume it's the ISO string or timestamp
      // Firestore startAfter requires the value of the orderBy field
      // For simplicity in this proto, we expect lastCreatedAt to be the timestamp string or object
      // If it's a string from JSON, we might need to parse it.
      // However, passing the document snapshot is strictly safer, but passing field value works too.
      // Let's assume we pass the ISO string or Timestamp object.
      // Since we are receiving string from Query param, we might need to parse.
      // Actually, for simplicity, let's just use the timestamp value if possible.

      // CAUTION: Firestore startAfter with field value requires exact type match.
      // 'createdAt' is serverTimestamp (Timestamp).
      // We will need to convert the incoming string back to a Timestamp or Date.
      const date = new Date(lastCreatedAt);
      query = query.startAfter(
        admin.firestore.Timestamp.fromDate(date),
      );
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString(), // Return ISO string
      };
    });
  }

  async findOne(id: string) {
    const doc = await this.db.collection('notice-board').doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException(`Notice with ID "${id}" not found`);
    }

    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt?.toDate().toISOString() ?? null,
    };
  }
}
