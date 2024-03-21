import { ChainKey, ChainObject } from "@gala-chain/api";
import { Exclude } from "class-transformer";
import { IsString } from "class-validator"


export class DiscordUser extends ChainObject {
    @Exclude()
    static INDEX_KEY = "GCDISC";

    @ChainKey({ position: 0 })
    @IsString()
    public readonly discordId: string;

    constructor(discordId: string) {
        super()
        this.discordId = discordId;
    }
}
