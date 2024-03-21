import { GalaChainContext, getObjectByKey, putChainObject } from "@gala-chain/chaincode";
import { StartMatchDto } from "./dtos";
import { NFTDMatch } from "./NFTDMatch";
import { ConflictError } from "@gala-chain/api";
import BigNumber from "bignumber.js";

export async function startMatch(ctx: GalaChainContext, dto: StartMatchDto): Promise<NFTDMatch> {
    // Create match ChainObject
    const match = new NFTDMatch(dto.index, dto.galaId, ctx.txUnixTime);

    // Check if match with index exists
    const existingMatch = await getObjectByKey(ctx, NFTDMatch, match.getCompositeKey()).catch(() => undefined);
    
    if (existingMatch !== undefined) {
        throw new ConflictError("Match already exists on chain", existingMatch.toPlainObject());
    }

    // Put match on chain
    await putChainObject(ctx, match);

    return match;
}