import { BigNumberProperty, ChainCallDTO } from "@gala-chain/api";
import { BigNumber } from "bignumber.js";

export class StartMatchDto extends ChainCallDTO {
    public readonly index: string;
    public readonly galaId: string;

    constructor(index: string, galaId: string) {
        super();
        this.index = index;
        this.galaId = galaId;
    }
}

type EndMatchDtoParams = {
    index: number;
    score: number;
    totalPointsScored: number;
    totalPointsDeducted: number;
    maxWaveCompleted: number;
    playSessionTimer: number;
    countOfEnemiesKilled: number;
    countOfBuildingsDestroyedByEnemies: number;
    countOfBuildingsPlaced: number;
}

export class EndMatchDto extends ChainCallDTO {
    public readonly index: string;
    public readonly score: number;
    public readonly totalPointsScored: number;
    public readonly totalPointsDeducted: number;
    public readonly maxWaveCompleted: number;
    public readonly playSessionTimer: number;
    public readonly countOfEnemiesKilled: number;
    public readonly countOfBuildingsDestroyedByEnemies: number;
    public readonly countOfBuildingsPlaced: number;

    constructor(
        index: string,
        score: number,
        totalPointsScored: number,
        totalPointsDeducted: number,
        maxWaveCompleted: number,
        playSessionTimer: number,
        countOfEnemiesKilled: number,
        countOfBuildingsDestroyedByEnemies: number,
        countOfBuildingsPlaced: number
    ) {
        super();
        this.index = index;
        this.score = score;
        this.totalPointsScored = totalPointsScored;
        this.totalPointsDeducted = totalPointsDeducted;
        this.maxWaveCompleted = maxWaveCompleted;
        this.playSessionTimer = playSessionTimer;
        this.countOfEnemiesKilled = countOfEnemiesKilled;
        this.countOfBuildingsDestroyedByEnemies = countOfBuildingsDestroyedByEnemies;
        this.countOfBuildingsPlaced = countOfBuildingsPlaced;
    }
}