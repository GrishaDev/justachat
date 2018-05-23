import { UserInt} from './user.interface';
import { Schema, Model, model, Types, SchemaTypes } from 'mongoose';

const userScheme: Schema = new Schema({
    id:   Number,
    name: String,
    pass: String,
    type: String
});

export const userModel: Model<UserInt> = model<UserInt>('usersa', userScheme);