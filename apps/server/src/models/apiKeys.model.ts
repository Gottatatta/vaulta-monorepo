import mongoose from 'mongoose';
import { Schema,  Model } from 'mongoose';
import { ApiKeyDocument } from "../types";


interface ApiKeyModelType extends Model<ApiKeyDocument> {
  updateLastUsedAt(hashedKey: string): Promise<void>;
}

const ApiKeySchema = new Schema<ApiKeyDocument, ApiKeyModelType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    displayKey: { type: String, required: true },
    hashedKey: { type: String, required: true, select: false },
    lastUsedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

ApiKeySchema.statics.updateLastUsedAt = async function (hashedKey: string): Promise<void> {
  await this.updateOne({ hashedKey }, { lastUsedAt: new Date() });
};

const ApiKeyModel = mongoose.model<ApiKeyDocument, ApiKeyModelType>('ApiKey', ApiKeySchema);

export default ApiKeyModel;
