import { User } from "./User";

export interface Post {
    id: number;
    title: string;
    body: string;
    user: Pick<User, "id">;
    created: Date;
}