const Author = require('../../models/author');
const { transformAuthor } = require('./Helpers');


module.exports = {

    authors: async () => {
        try {
            const authors = await Author.find()
            return authors.map(author => {
                return transformAuthor(author);
            });

        } catch(err) {
            throw err;
        }
    },
    addAuthor: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try {
            const author = new Author({
                name: args.authorInput.name,
                bio: args.authorInput.bio,
                photo:args.authorInput.photo,
            });
            const result = await author.save();
            return transformAuthor(result);
        } catch (err) {
            throw err;
        }
    },
};