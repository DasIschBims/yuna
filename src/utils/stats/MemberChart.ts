import {Guild} from "discord.js";
import {ChartData, MemberChart} from "../../types/Stats";
import {getDaysArray} from "./GetDaysArray";
import {ChartConfiguration} from "chart.js";
import dayjs from "dayjs";
import {getRandomColor} from "../colors/BrandColor";
import {chartJSNodeCanvas} from "./ChartJSNodeCanvas";

export const memberChart = async (
    guild: Guild,
): Promise<MemberChart> => {
    const guildId = guild.id;
    const guildName = guild.name;

    const dates = (await guild.members.fetch())
        .filter((member) => !member.user.bot)
        .map((member) => member.joinedAt || new Date())
        .sort((a, b) => a.getTime() - b.getTime());


    if (!dates[0]) return { error: "No dates found" };

    const startEndDate = getDaysArray(
        dates[0],
        dayjs().add(1, "day").toDate()
    );

    const data: ChartData[] = startEndDate.map((date) => ({
        x: dayjs(date).toDate(),
        y: dates.filter((d) => dayjs(d) <= dayjs(date)).length,
    }));

    let thirtyDaysCount, sevenDaysCount, oneDayCount = data[data.length - 1].y;

    if (data.length >= 30)
        thirtyDaysCount = data[data.length - 30].y - guild.memberCount + 1;
    if (data.length >= 7)
        sevenDaysCount = data[data.length - 7].y - guild.memberCount + 1;
    if (data.length >= 1)
        oneDayCount = data[data.length - 1].y - guild.memberCount + 1;

    const color = getRandomColor();

    const chartConfig = {
        type: "line",
        data: {
            datasets: [
                {
                    data: data,
                    fill: true,
                    borderColor: color,
                    backgroundColor: color.valueOf() + "10"
                }
            ]
        },
        options: {
            showLine: true,
            elements: {
                point: {
                    radius: 0
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                yAxes: {
                    ticks: { color: "#ffffff" },
                    grid: { color: "#c0c0c0", z: 100, drawBorder: false }
                },
                xAxes: {
                    ticks: { color: "#ffffff" },
                    grid: { display: false, z: 100, drawBorder: false },
                    type: "time",
                    time: {
                        unit: data.length > 360 ? "month" : "day"
                    }
                }
            }
        }
    } as ChartConfiguration<'line', ChartData[]>;

    const image = await chartJSNodeCanvas.renderToBuffer(
        chartConfig as unknown as ChartConfiguration,
        "image/png"
    );

    return {
        color: color,
        fileName: `${guildId}-${guildName}-members.png`,
        img: Buffer.from(image),
        thirtyDaysCount: thirtyDaysCount,
        sevenDaysCount: sevenDaysCount,
        oneDayCount: oneDayCount
    };
};