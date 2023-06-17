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

export type MemberChartData = {
    x: Date;
    y: number;
}

export type ChatterChart = {
    color?: ColorResolvable;
    fileName?: string;
    img?: Buffer;
    error?: string;
}

export type ChatterChartData = {
    x: string;
    y: number;
}