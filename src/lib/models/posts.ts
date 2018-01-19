import { Generic } from "./generic";

export class Posts extends Generic {
    static collectionName: string = "posts";

    constructor() {
        super(Posts.collectionName);
    }
}