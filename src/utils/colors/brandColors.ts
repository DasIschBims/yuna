// create a function that picks a random color from the brandColors array
// and returns it
import {ColorResolvable} from "discord.js";

const brandColors: ColorResolvable[] = [
    "#0081a7",
    "#00afb9",
    "#fdfcdc",
    "#fed9b7",
    "#f07167"
];
// never get the same color twice in a row
let lastColor: ColorResolvable = "#000000";

export function getRandomColor(): ColorResolvable {
    let color: ColorResolvable = brandColors[Math.floor(Math.random() * brandColors.length)];
    if (color === lastColor) {
        color = getRandomColor();
    }
    lastColor = color;
    return color;
}