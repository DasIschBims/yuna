export const getNextLevelGoal = (level: number) => {
    return Math.floor(10 * (level * level) + (55 * level) + 450);
}