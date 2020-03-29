const Studio = require('../../models/studio');
const { transformStudio } = require('./Helpers');


module.exports = {

    studios: async () => {
        try {
            const studios = await Studio.find()
            return studios.map(studio => {
                return transformStudio(studio);
            });

        } catch(err) {
            throw err;
        }
    },
    addStudio: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try {
            const creator = new Studio({
                name: args.studioInput.name,
                bio: args.studioInput.bio,
                photo:args.studioInput.photo,
            });
            const result = await creator.save();
            return transformStudio(result);
        } catch (err) {
            throw err;
        }
    },
};