import { BigNumberProperty, ChainKey, ChainObject, ForbiddenError } from "@gala-chain/api";
import {Exclude} from "class-transformer";
import BigNumber from "bignumber.js";
import { IsString } from "class-validator";

type ValidEndDataParams = {
    started: number;
    ended: number;
    score: number;
    totalPointsScored: number;
    totalPointsDeducted: number;
    maxWaveCompleted: number;
    playSessionTimer: number;
    countOfEnemiesKilled: number;
    countOfBuildingsDestroyedByEnemies: number;
    countOfBuildingsPlaced: number;
}

export class NFTDMatch extends ChainObject {
    @Exclude()
    static INDEX_KEY = "NFTDM";

    @ChainKey({ position: 0 })
    @IsString()
    public readonly index: string;

    @IsString()
    public readonly galaId: string;

    public readonly startedAt: number;
    public endedAt: number;

    public score: number;
    public totalPointsScored: number;
    public totalPointsDeducted: number;
    public maxWaveCompleted: number;
    public playSessionTimer: number;
    public countOfEnemiesKilled: number;
    public countOfBuildingsDestroyedByEnemies: number;
    public countOfBuildingsPlaced: number;

    constructor(index: string, galaId: string, startedAt: number) {
        super();
        this.index = index;
        this.galaId = galaId;
        this.startedAt = startedAt;
        this.endedAt = 0;
        this.score = 0;
        this.totalPointsScored = 0;
        this.totalPointsDeducted = 0;
        this.maxWaveCompleted = 0;
        this.playSessionTimer = 0;
        this.countOfEnemiesKilled = 0;
        this.countOfBuildingsDestroyedByEnemies = 0;
        this.countOfBuildingsPlaced = 0;
    }

    /**
     * Basic checking for endMatch data
     * @param started 
     * @param ended 
     * @param score 
     * @param enemiesKilled 
     * @param wavesCleared 
     */
    public ensureValidEndData(params: ValidEndDataParams) {
        if (this.endedAt !== 0) {
            throw new ForbiddenError("Match has already ended");
        }
        if (this.startedAt !== params.started) {
            throw new ForbiddenError("Match start time does not match");
        }
        if (params.ended < params.started) {
            throw new ForbiddenError("Match end time is before start time");
        }
        if (params.countOfEnemiesKilled < 0) {
            throw new ForbiddenError("Enemies killed cannot be negative");
        }
        if (params.maxWaveCompleted < 0) {
            throw new ForbiddenError("maxWaveCompleted cannot be negative");
        }

        const put = () => {
            this.endedAt = params.ended;
            this.score = params.score;
            this.totalPointsScored = params.totalPointsScored
            this.totalPointsDeducted = params.totalPointsDeducted
            this.maxWaveCompleted = params.maxWaveCompleted
            this.playSessionTimer = params.playSessionTimer
            this.countOfEnemiesKilled = params.countOfEnemiesKilled
            this.countOfBuildingsDestroyedByEnemies = params.countOfBuildingsDestroyedByEnemies
            this.countOfBuildingsPlaced = params.countOfBuildingsPlaced
        }

        return { put }
    }
}