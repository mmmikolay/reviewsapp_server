const bcrypt = require("bcryptjs");
const User = require('../../models/user');
const jwt = require('jsonwebtoken');


module.exports = {
    createUser: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try {
            const existingUser = await User.findOne({email:args.userInput.email})
                if (existingUser){
                    throw new Error('User exists already');
                }
                const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
                    const user = new User ({
                        email: args.userInput.email,
                        password: hashedPassword,
                    });
                    const result = await user.save()
                        return { ...result._doc,password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    login: async ({ email, password },{res}) => {
        try {
            const user = await User.findOne({email:email});
            if(!user) {
                throw new Error ('Username or Password is incorrect!');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if(!isEqual){
                throw new Error('Username or Password is incorrect!');
            }
            const token = jwt.sign({userId: user.id, email:user.email},process.env.HASH_KEY,{
                expiresIn: '1h',
            });
            res.cookie("jwt",token,{
                httpOnly:true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60, // 1 hour
            })
            return {
                success: true,
            }
        } catch (err){
            throw err;

        }
    }    
};