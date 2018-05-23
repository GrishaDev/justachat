import { Document } from 'mongoose';

export interface UserInt extends Document 
{
    id:   Number,
    name: String,
    pass: String,
    type: String
}
