const mongoDB = require('mongodb');
const mongoClient = mongoDB.MongoClient;


let _db;

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://michael123:123@cluster0.zycpsub.mongodb.net/?retryWrites=true&w=majority').then(
        client => {
            console.log('Connected!');
            _db = client.db();
            callback(client);
        }
    ).catch(
        err => {
            console.log(err);
        }
    );
}

const getDB = () => {
    if (_db) {
      
        return _db;
    }
    throw 'No database found!';
}



exports.mongoConnect = mongoConnect;
exports.getDB = getDB;

