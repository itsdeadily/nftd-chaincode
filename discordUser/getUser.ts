import { GalaChainContext, getObjectByKey } from "@gala-chain/chaincode";
import { DiscordUserDto } from "./dtos";
import { DiscordUser } from "./DiscordUser";

/**
 * Fetches a user by discordId on-chain
 */
export default async (ctx: GalaChainContext, dto: DiscordUserDto) => {
    const key = ctx.stub.createCompositeKey(DiscordUser.INDEX_KEY, [dto.discordId])
    const object = await getObjectByKey(ctx, DiscordUser, key).catch(() => undefined);
    return object;
}