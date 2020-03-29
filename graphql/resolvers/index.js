const authorsResolver = require('./authors');
const studiosResolver = require('./studios');
const directorsResolver = require('./directors');
const booksResolver = require('./books');
const gamesResolver = require('./games');
const moviesResolver = require('./movies');

const authResolver = require('./auth');

const rootResolver = {
    ...authorsResolver,
    ...studiosResolver,
    ...directorsResolver,
    ...booksResolver,
    ...gamesResolver,
    ...moviesResolver,
    ...authResolver,
}

module.exports = rootResolver;