import { GalaChainContext, GalaContract, Submit } from "@gala-chain/chaincode";
import { EndMatchDto, StartMatchDto } from "./dtos";
import { startMatch } from "./startMatch";
import { NFTDMatch } from "./NFTDMatch";
import endMatch from "./endMatch";


export class NFTDContract extends GalaContract {
    constructor() {
        super("NFTDContract", "0.0.1");
    }

    @Submit({
        in: StartMatchDto,
    })
    public async StartMatch(ctx: GalaChainContext, dto: StartMatchDto): Promise<void> {
        await startMatch(ctx, dto)
    }

    @Submit({
        in: EndMatchDto,
        out: NFTDMatch,
    })
    public async EndMatch(ctx: GalaChainContext, dto: EndMatchDto): Promise<NFTDMatch> {
        return await endMatch(ctx, dto);
    }
}