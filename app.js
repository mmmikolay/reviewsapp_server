const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require ('./middleware/is-auth');


// Initialize express.
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://mmmikolay.github.io");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if(req.method === "OPTIONS"){
        return res.sendStatus(200);
    }
    next();
});

app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(isAuth);

app.use('/graphql',graphqlHTTP({
    schema:graphQlSchema,
    rootValue:graphQlResolvers,
    graphiql:true,
}));

// Establish the database connection.
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-zghzd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
}).then(()=>{
    app.listen({port: process.env.PORT || 4000},() => {
        console.log("Now listening for requests.")
    })

}).catch(err => {
    console.log(err);
});


mongoose.connection.once('open',()=>{
    console.log('Connected to database')
})
