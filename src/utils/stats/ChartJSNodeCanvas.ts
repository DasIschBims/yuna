import {ChartJSNodeCanvas} from "chartjs-node-canvas";

export const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: 1600,
    height: 400,
    backgroundColour: "#3f424f",
    plugins: {
        globalVariableLegacy: ['chartjs-adapter-dayjs-3']
    },
});