const { buildSchema } = require('graphql');


module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
    }
    type AuthData{
        userId: ID!
        token: String!
        tokenExpiration: Int!
        success: Boolean!
    }
    type Author {
        _id: ID!
        name: String!
        bio: String!
        photo: String!
        items: [Book!]     
    }
    type Director {
        _id: ID!
        name: String!
        bio: String!
        photo: String!   
        items: [Movie!] 
    }
    type Studio {
        _id: ID!
        name: String!
        bio: String!
        photo: String!
        items: [Game!] 
    }
    type Book {
        _id: ID!
        name: String!
        cover: String!
        review: String!   
        header: String!   
        detailsPhoto: String! 
        creator: Author!  
    }
    type Movie {
        _id: ID!
        name: String!
        cover: String!
        review: String!   
        header: String!   
        detailsPhoto: String!  
        creator: Director!  
    }
    type Game {
        _id: ID!
        name: String!
        cover: String!
        review: String!   
        header: String!   
        detailsPhoto: String!  
        creator: Studio!  
    }
    input UserInput {
        email: String!
        password: String!
    }
    input ItemInput {
        name: String!
        cover: String!
        review: String!   
        header: String!   
        detailsPhoto: String!  
        creatorId: ID!
    }
    input CreatorInput {
        name: String!
        bio: String!
        photo: String!
    }
    type RootQuery {
        authors:[Author!]!
        directors:[Director!]!
        studios:[Studio!]!

        books:[Book!]!
        movies:[Movie!]!
        games:[Game!]!

        login(email: String!, password:String!): AuthData!
    }
    type RootMutation {
        addAuthor(authorInput: CreatorInput): Author
        addDirector(directorInput: CreatorInput): Director
        addStudio(studioInput: CreatorInput): Studio

        addBook(bookInput: ItemInput):Book
        addMovie(movieInput: ItemInput):Movie
        addGame(gameInput: ItemInput):Game

        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);