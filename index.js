var express = require('express');
var app = express();
const product = require('./models/product');
const User = require('./models/user');


const mongoConnect = require('./util/database').mongoConnect;

mongoConnect(() => {
    app.listen(3000);
});

app.post('/create-product', (req, res, next) => {
    const product1 = new product('A Book', 12.99, 'A great book!', 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SX184_.jpg');
    product1.save().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
    res.send('<h1>User Created</h1>');
});

app.get('/products', (req, res, next) => {
    product.fetchAll().then(products => {
        console.log(products);
        res.send(products)
    }).catch(err => {
        console.log(err);
        res.send(err);
    });

});

app.get('/product/:productId', (req, res, next) => {
    const prodId = req.params.productId;
    product.findById(prodId).then(product => {
        console.log(product);
        res.send(product);
    }).catch(err => {
        console.log(err);

    });
});

app.post('/update-product/:productId', (req, res, next) => {
    const prodId = req.params.productId;
    const product1 = new product('Next Book', 30, 'A super book!', 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SX184_.jpg');
    product.update(prodId, product1).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        console.log(err);
    });
});

app.post('/delete-product/:productId', (req, res, next) => {
    const prodId = req.params.productId;
    product.delete(prodId).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        console.log(err);
    });
});

app.post('/create-user', (req, res, next) => {
    const user = new User('Michael', 'test@test.com')
    user.save().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
    res.send('<h1>User Created</h1>');
});

var { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');


app.use('/graphql', graphqlHTTP(
    {
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        formatError(err) {
            if (!err.originalError) {
                return err;
            }
            const data = err.originalError.data;
            const message = err.message || 'An error occurred.';
            const code = err.originalError.code || 500;
            return { message: message, status: code, data: data };
        }
    }
));






