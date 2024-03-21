import { GalaChainContext, getObjectByKey, putChainObject } from "@gala-chain/chaincode";
import { DiscordUserDto } from "./dtos";
import { DiscordUser } from "./DiscordUser";

export default async (ctx: GalaChainContext, dto: DiscordUserDto): Promise<DiscordUser> => {
    const user = new DiscordUser(dto.discordId);
    const existingUser = await getObjectByKey(ctx, DiscordUser, user.getCompositeKey()).catch(() => undefined);

    if (existingUser !== undefined) {
        throw new Error("User already exists on chain");
    }

    await putChainObject(ctx, user)

    return user;
}