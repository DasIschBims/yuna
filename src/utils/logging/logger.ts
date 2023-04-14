import gradient from "gradient-string";
import colors from "colors";
import figlet from "figlet";

export class Logger {
    static logSuccess(message: string, type: string) {
        console.log(colors.green(`${type} | ${message}`).bold);
    }

    static logWarning(message: string, type: string) {
        console.log(colors.yellow(`${type} | ${message}`).bold);
    }

    static logError(message: string, type: string) {
        console.log(colors.red(`${type} | ${message}`).bold);
    }

    static logInfo(message: string, type: string) {
        console.log(colors.gray(`${type} | ${message}`).bold);
    }

    static log(message: string, type: string) {
        console.log(colors.blue(`${type} | ${message}`).bold);
    }

    static printLogo() {
        const logoGradient = gradient([
            {color: '#0081a7', pos: 0.1},
            {color: '#00afb9', pos: 0.3},
            {color: '#fdfcdc', pos: 0.5},
            {color: '#fed9b7', pos: 0.7},
            {color: '#f07167', pos: 0.9},
        ]);

        return new Promise<void>((resolve, reject) => {
            figlet.text("yuna - bot", {
                font: "Ogre",
                horizontalLayout: "default",
                verticalLayout: "default",
                width: 100,
                whitespaceBreak: true
            }, function (err, data) {
                if (err) {
                    Logger.logError(`${err}`, "Startup");
                    reject(err);
                } else {
                    console.log(logoGradient.multiline(data + "\n---------------------------------------------------").bold + "\n");
                    resolve();
                }
            });
        });
    }
}