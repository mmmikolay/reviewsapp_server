const Movie = require('../../models/movie');
const Director = require('../../models/director');
const { transformMovie } = require('./Helpers');


module.exports = {
    movies: async () => {
        try {
            const movies = await Movie.find()
            return movies.map(movie => {
                return transformMovie(movie);
            });

        } catch(err) {
            throw err;
        }
    },
    addMovie: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try {
            const movie = new Movie({
                name: args.movieInput.name,
                cover: args.movieInput.cover,
                review: args.movieInput.review,
                header: args.movieInput.header,
                detailsPhoto: args.movieInput.detailsPhoto,
                creator: args.movieInput.creatorId,
            });
            let createdMovie;
            const result = await movie.save();
            createdMovie = transformMovie(result);
            const creator = await Director.findById(args.movieInput.creatorId);
            if(!creator){
                throw new Error("Director does not exist");
            }
            creator.items.push(movie._doc._id);
            await creator.save();
            return createdMovie;
        } catch(err){
            throw err;
        }
    }
};