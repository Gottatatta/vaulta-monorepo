import { Types, Document } from 'mongoose';
import { UploadSourceEnum } from "../enums";

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  profilePicture: string | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(value: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, 'password'>;
}

export interface FileDocument extends Document {
  userId: Types.ObjectId;
  originalName: string;
  storageKey: string;
  mimeType: string;
  size: number; 
  formattedSize: string;
  ext: string;
  uploadVia: keyof typeof UploadSourceEnum;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiKeyDocument extends Document {
  userId: Types.ObjectId;
  name: string;
  displayKey: string;
  hashedKey: string;
  createdAt: Date;
  updatedAt: Date;
  lastUsedAt?: Date;
}