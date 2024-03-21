import { GalaChainContext, ObjectNotFoundError, getObjectByKey, putChainObject } from "@gala-chain/chaincode";
import { EndMatchDto } from "./dtos";
import { NFTDMatch } from "./NFTDMatch";
import { ForbiddenError, IsBigNumber } from "@gala-chain/api";


export default async function(ctx: GalaChainContext, dto: EndMatchDto): Promise<NFTDMatch> {
    // Get match from chain
    const key = ctx.stub.createCompositeKey(NFTDMatch.INDEX_KEY, [dto.index.toString()])
    const match = await getObjectByKey(ctx, NFTDMatch, key);

    if (match === undefined) {
        // Match with index does not exist
        throw new ObjectNotFoundError(dto.index.toString());
    } else if (ctx.callingUser !== match.galaId) {
        // Calling user does not match the user that started the match
        throw new ForbiddenError("Calling user did not start match id: " + dto.index);
    }

    match.ensureValidEndData({
        started: match.startedAt,
        ended: ctx.txUnixTime,
        score: dto.score,
        totalPointsScored: dto.totalPointsScored,
        totalPointsDeducted: dto.totalPointsDeducted,
        maxWaveCompleted: dto.maxWaveCompleted,
        playSessionTimer: dto.playSessionTimer,
        countOfEnemiesKilled: dto.countOfEnemiesKilled,
        countOfBuildingsDestroyedByEnemies: dto.countOfBuildingsDestroyedByEnemies,
        countOfBuildingsPlaced: dto.countOfBuildingsPlaced,
    }).put();

    await putChainObject(ctx, match);

    return match;
}