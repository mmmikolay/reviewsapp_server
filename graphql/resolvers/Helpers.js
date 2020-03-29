const Author = require('../../models/author');
const Studio = require('../../models/studio');
const Director = require('../../models/director');

const Book = require('../../models/book');
const Game = require('../../models/game');
const Movie = require('../../models/movie');


const authorFunc = async authorId => {
    try {
        const author = await Author.findById(authorId);
        return transformAuthor(author);
    } catch (err) {
        throw err;
    }
};

const studioFunc = async studioId => {
    try {
        const studio = await Studio.findById(studioId);
        return transformStudio(studio);
    } catch (err) {
        throw err;
    }
};

const directorFunc = async directorId => {
    try {
        const director = await Director.findById(directorId);
        return transformDirector(director);
    } catch (err) {
        throw err;
    }
};

const booksFunc = async bookIds => {
    try{
        const books = await Book.find({_id:{$in:bookIds}})
        return books.map(book => {
            return transformBook(book);
        });        
    } catch (err) {
        throw err;
    }
};

const gamesFunc = async (gameIds) => {
    try{
        const games = await Game.find({_id:{$in:gameIds}})
        return games.map(game => {
            return transformGame(game);
        })
        
    } catch (err) {
        throw err;
    }
};

const moviesFunc = async (movieIds) => {
    try{
        const movies = await Movie.find({_id:{$in:movieIds}})
        return movies.map(movie => {
            return transformMovie(movie);
        });        
    } catch (err) {
        throw err;
    }
};

const transformBook = book => {
    return {
        ...book._doc,
        _id: book._doc._id,
        name: book._doc.name,
        cover: book._doc.cover,
        review: book._doc.review,
        header: book._doc.header,
        detailsPhoto: book._doc.detailsPhoto,
        creator: authorFunc.bind(this, book._doc.creator),
    }
}

const transformGame = game => {
    return {
        ...game._doc,
        _id: game._doc._id,
        name: game._doc.name,
        cover: game._doc.cover,
        review: game._doc.review,
        header: game._doc.header,
        detailsPhoto: game._doc.detailsPhoto,
        creator: studioFunc.bind(this, game._doc.creator),
    }
};
const transformMovie = movie => {
    return {
        ...movie._doc,
        _id: movie._doc._id,
        name: movie._doc.name,
        cover: movie._doc.cover,
        review: movie._doc.review,
        header: movie._doc.header,
        detailsPhoto: movie._doc.detailsPhoto,
        creator: directorFunc.bind(this, movie._doc.creator),
    }
};

const transformAuthor = author => {
    return {
        ...author._doc,
        _id: author._doc._id,
        name: author._doc.name,
        bio: author._doc.bio,
        photo: author._doc.photo,
        items: booksFunc.bind(this,author._doc.items),
    }  
}

const transformStudio = studio => {
    return {
        ...studio._doc,
        _id: studio._doc._id,
        name: studio._doc.name,
        bio: studio._doc.bio,
        photo: studio._doc.photo,
        items: gamesFunc.bind(this,studio._doc.items),
    }
};
const transformDirector = director => {
    return {
        ...director._doc,
        _id: director._doc._id,
        name: director._doc.name,
        bio: director._doc.bio,
        photo: director._doc.photo,
        items: moviesFunc.bind(this,director._doc.items),
    }
};

exports.transformBook = transformBook;
exports.transformGame = transformGame;
exports.transformMovie = transformMovie;

exports.transformAuthor = transformAuthor;
exports.transformStudio = transformStudio;
exports.transformDirector = transformDirector;