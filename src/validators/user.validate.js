import joi from 'joi';

export const createUserSchema = joi.object({
    username: joi.string().required().alphanum().min(3).max(30),
    password: joi.string().required(),
});


//.pattern(new ReqExp('^[a-zA-Z0-9]{3,30}$'))
