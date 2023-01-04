const getDB = require('../util/database').getDB;

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne(this).then(result => {
            console.log(result);
        }
        ).catch(err => {
            console.log(err);
        });
    }

    static findById(userId) {
        const db = getDB();
        return db.collection('users').find({ _id: new mongoDB.ObjectId(userId) }).next().then(user => {

            return user;
        }).catch(err => {
            console.log(err);
        }
        );
    }
}

module.exports = User;