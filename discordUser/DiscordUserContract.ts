import { Evaluate, GalaChainContext, GalaContract, Submit } from "@gala-chain/chaincode";
import { DiscordUserDto } from "./dtos";
import createUser from "./createUser";
import { DiscordUser } from "./DiscordUser";
import getUser from "./getUser";


export class DiscordUserContract extends GalaContract {
    constructor() {
        super("DiscordUserContract", "1.0.0");
    }

    @Submit({
        in: DiscordUserDto,
        out: DiscordUser,
    })
    public async CreateUser(ctx: GalaChainContext, dto: DiscordUserDto): Promise<DiscordUser> {
        return await createUser(ctx, dto);
    }

    @Evaluate({
        in: DiscordUserDto,
        out: DiscordUser,
    })
    public async GetUser(ctx: GalaChainContext, dto: DiscordUserDto): Promise<DiscordUser | undefined> {
        return await getUser(ctx, dto);
    }
}