const Game = require('../../models/game');
const Studio = require('../../models/studio');
const { transformGame } = require('./Helpers');


module.exports = {
    games: async () => {
        try {
            const games = await Game.find()
            return games.map(game => {
                return transformGame(game);
            });

        } catch(err) {
            throw err;
        }
    },
    addGame: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try {
            const game = new Game({
                name: args.gameInput.name,
                cover: args.gameInput.cover,
                review: args.gameInput.review,
                header: args.gameInput.header,
                detailsPhoto: args.gameInput.detailsPhoto,
                creator: args.gameInput.creatorId,
            });
            let createdGame;
            const result = await game.save();
            createdGame = transformGame(result);
            const creator = await Studio.findById(args.gameInput.creatorId);
            if(!creator){
                throw new Error("Studio does not exist");
            }
            creator.items.push(game._doc._id);
            await creator.save();
            return createdGame;
        } catch(err){
            throw err;
        }
    }
};