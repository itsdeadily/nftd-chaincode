import { ChainCallDTO } from "@gala-chain/api";
import { IsString } from "class-validator";


export class DiscordUserDto extends ChainCallDTO {
    @IsString()
    public readonly discordId: string;

    constructor(discordId: string) {
        super();
        this.discordId = discordId;
    }
}