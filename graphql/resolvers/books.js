const Book = require('../../models/book');
const Author = require('../../models/author');
const { transformBook } = require('./Helpers');


module.exports = {
    books: async () => {
        try {
            const books = await Book.find()
            return books.map(book => {
                return transformBook(book);
            });

        } catch(err) {
            throw err;
        }
    },
    addBook: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try {
            const book = new Book({
                name: args.bookInput.name,
                cover: args.bookInput.cover,
                review: args.bookInput.review,
                header: args.bookInput.header,
                detailsPhoto: args.bookInput.detailsPhoto,
                creator: args.bookInput.creatorId,
            });
            let createdBook;
            const result = await book.save();
            createdBook = transformBook(result);
            const creator = await Author.findById(args.bookInput.creatorId);
            if(!creator){
                throw new Error("Author does not exist");
            }
            creator.items.push(book._doc._id);
            await creator.save();
            return createdBook;
        } catch(err){
            throw err;
        }
    }
};