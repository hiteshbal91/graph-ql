import { Generic } from "./generic";

export class Users extends Generic {
    static collectionName: string = "users";

    constructor() {
        super(Users.collectionName);
    }
}