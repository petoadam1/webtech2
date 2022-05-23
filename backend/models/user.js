const db = require('../util/database');

module.exports = class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static selectByEmail(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }

    static insert(user) {
        return db.execute(
            'INSERT INTO users (name, email, password) VALUES (?,?,?)',
            [user.name, user.email, user.password]
        );
    }
};