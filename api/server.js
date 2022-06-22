const express = require("express");
const path = require("path")
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require("./schemas")
const { Authenticate } = require('./utils/authentication')

async function StartApolloServer(typeDefs, resolvers, Authenticate)
{
    const port = process.env.PORT || 5000;
    let app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: Authenticate,
        playground: true
    })

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }
      
      app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
      });

    await server.start();

    server.applyMiddleware({ app })

    app.use(bodyParser.urlencoded({
        extended: true
      }));
    app.use(morgan('dev'))
    
    
    // app.use('/', express.static('public'))

    app.listen(port, () => {
        console.log(`Server started on port ${port} :)`);
        console.log(`GraphQL dev env located here http://localhost:${port}${server.graphqlPath}`);
    });
}

StartApolloServer(typeDefs, resolvers, Authenticate)
// if (process.env.NODE_ENV === 'production')
// {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))
// }

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
// })

