import { User } from '../shared/user';

export class Comment {
    rating: number;
    comment: string;
    date: Date;
    author: User;
}