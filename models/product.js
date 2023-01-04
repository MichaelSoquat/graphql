const getDB = require('../util/database').getDB;
const mongoDB = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDB();
        return db.collection('products').insertOne(this).then(result => {
            console.log(result);
        }
        ).catch(err => {
            console.log(err);
        });
    }

    static fetchAll() {
        return getDB().collection('products').find().toArray().then(products => {
            console.log(products);
            return products;
        }).catch(err => {
            console.log(err);
        }
        );
    }

    static findById(prodId) {
        return getDB().collection('products').find({ _id: new mongoDB.ObjectId(prodId) }).next().then(product => {
            console.log(product);
            return product;
        }).catch(err => {
            console.log(err);
        }
        );
    }

    static update(prodId, product) {
        return getDB().collection('products').updateOne({ _id: new mongoDB.ObjectId(prodId) }, {
            $set: {
                title: product.title,
                price: product.price,
                description: product.description,
                imageUrl: product.imageUrl
            }
        }).then(result => {
            console.log(result);
            return { ...product, _id: prodId };
        }).catch(err => {
            console.log(err);
        }
        );
    }

    static delete(prodId) {
        return getDB().collection('products').deleteOne({ _id: new mongoDB.ObjectId(prodId) }).then(result => {
            console
                .log(result);
        }).catch(err => {
            console.log(err);
        }
        );
    }


}

module.exports = Product;