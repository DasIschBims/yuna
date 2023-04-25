import mysql from 'mysql';

interface YunaUser {
    id: number;
    xp: number;
    level: number;
    balance: number;
}

export class User {
    private static readonly tableName = 'users';

    constructor(private readonly db: mysql.Connection) {}

    public async createTable(): Promise<void> {
        const sql = `
            CREATE TABLE IF NOT EXISTS ${User.tableName} (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                xp INT(11) NOT NULL DEFAULT 0,
                level INT(11) NOT NULL DEFAULT 0,
                balance INT(11) NOT NULL DEFAULT 0
            )
        `;

        return new Promise<void>((resolve, reject) => {
            this.db.query(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public async getUserById(id: number): Promise<YunaUser | null> {
        const sql = `
            SELECT * FROM ${User.tableName} WHERE id = ?
        `;

        return new Promise<YunaUser | null>((resolve, reject) => {
            this.db.query(sql, [id], (err, results: YunaUser[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0] ?? null);
                }
            });
        });
    }

    public async updateUser(user: YunaUser): Promise<void> {
        const sql = `
            UPDATE ${User.tableName} SET xp = ?, level = ?, balance = ? WHERE id = ?
        `;

        return new Promise<void>((resolve, reject) => {
            this.db.query(sql, [user.xp, user.level, user.balance, user.id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public async createUser(user: Omit<YunaUser, 'id'>): Promise<YunaUser> {
        const sql = `
            INSERT INTO ${User.tableName} (xp, level, balance) VALUES (?, ?, ?)
        `;

        return new Promise<YunaUser>((resolve, reject) => {
            this.db.query(sql, [user.xp, user.level, user.balance], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        id: results.insertId,
                        xp: user.xp,
                        level: user.level,
                        balance: user.balance
                    });
                }
            });
        });
    }
}