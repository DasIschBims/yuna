// create a function that picks a random color from the brandColor array
// and returns it
import {ColorResolvable} from "discord.js";

const brandColor: ColorResolvable[] = [
    "#0081a7",
    "#00afb9",
    "#fdfcdc",
    "#fed9b7",
    "#f07167"
];
// never get the same color twice in a row
let lastColor: ColorResolvable = "#000000";

export function getRandomColor(): ColorResolvable {
    let color: ColorResolvable = brandColor[Math.floor(Math.random() * brandColor.length)];
    if (color === lastColor) {
        color = getRandomColor();
    }
    lastColor = color;
    return color;
}