import {ColorResolvable} from "discord.js";

export type MemberChart = {
    color?: ColorResolvable;
    fileName?: string;
    img?: Buffer;
    thirtyDaysCount?: number;
    sevenDaysCount?: number;
    oneDayCount?: number;
    error?: string;
}

export type ChartData = {
    x: Date;
    y: number;
}