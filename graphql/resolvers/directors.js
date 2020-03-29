const Director = require('../../models/director');
const { transformDirector } = require('./Helpers');


module.exports = {

    directors: async () => {
        try {
            const directors = await Director.find()
            return directors.map(director => {
                return transformDirector(director);
            });

        } catch(err) {
            throw err;
        }
    },
    addDirector: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try {
            const creator = new Director({
                name: args.directorInput.name,
                bio: args.directorInput.bio,
                photo:args.directorInput.photo,
            });
            const result = await creator.save();
            return transformDirector(result);
        } catch (err) {
            throw err;
        }
    },
};