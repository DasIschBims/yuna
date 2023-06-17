import {Guild} from "discord.js";
import {ChatterChart, ChatterChartData} from "../../types/Stats";
import {ChartConfiguration} from "chart.js";
import {chartJSNodeCanvas} from "./ChartJSNodeCanvas";
import {getRandomColor} from "../colors/BrandColor";
import {prisma} from "../db/Prisma";

export const chatterChart = async (
    guild: Guild,
): Promise<ChatterChart> => {
    const guildId = guild.id;
    const guildName = guild.name.replace(/[^a-zA-Z0-9]/g, "");
    const color = getRandomColor();

    const topUsers = await prisma.userGuild.findMany({
        where: {
            guildId: guildId
        },
        select: {
            userId: true,
            messageCount: true
        },
        orderBy: {
            messageCount: "desc"
        },
        take: 10
    });

    const data: ChatterChartData[] = topUsers.map((member) => ({
        x: guild.members.cache.get(member.userId)?.displayName || "Unknown",
        y: member.messageCount
    }));

    if (!data) {
        return {
            color: color,
            error: "No data found."
        };
    }

    const chartConfig = {
        type: "bar",
        data: {
            datasets: [
                {
                    data: data,
                    borderColor: color,
                    backgroundColor: color.valueOf() + "10"
                }
            ]
        },
        options: {
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                xAxes: {
                    ticks: {
                        color: color,
                        font: {
                            size: 16
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                yAxes: {
                    ticks: {
                        color: color,
                        font: {
                            size: 16
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    } as ChartConfiguration<"bar", ChatterChartData[]>;

    const image = await chartJSNodeCanvas.renderToBuffer(
        chartConfig as unknown as ChartConfiguration,
        "image/png"
    );

    return {
        color: color,
        fileName: `${guildId}-${guildName}-chatter-chart.png`,
        img: image
    };
};