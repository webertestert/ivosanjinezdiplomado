import { User } from '../models/user.js';
import { Task } from '../models/task.js';
import logger from '../logs/logger.js';
import { Status } from '../constants/index.js';
import { encriptar } from '../common/bcrypt.js';
async function getUsers(req, res, next) {
   try{
    const users = await User.findAll({
        attributes: ['id','username','password','status'],
        order: [['id', 'DESC']],
        where: {
            status: Status.ACTIVE,
        },
    });
    res.json(users);
   } catch (error) {
    next(error);
    //logger.error(error.message)
    //return res.status(500).json({ message: error.message});
   } 
}

async function createUser(req, res, next){
    console.log('entra al controlador');
    //console.log(req.body);
    const { username, password } = req.body;
    try{
        // hash la contrase;a y guardaar
        const user = await User.create({
            username,
            password,
        })
        res.json(user);
    } catch (error) {
        console.log("Entra a error");
        next(error);
        //logger.error(error.message);
        //res.status(500).json({ message: error.message });
    }
}

async function getUser(req, res, next){
    const{ id } = req.params;
    try {
        //const user = await User.findByPk(id);
        const user = await User.findOne({
            attributes: ['username', 'password', 'status'],
            where: {
                id: id,
            }
        });
        if (!user) res.status(404).json({ message: 'user not found'});
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next){
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        if (!username && !password) {
            return res
                .status(400)
                .json({ message: 'Username or pasword is required'});
        }
        const passwordEncriptado = await encriptar(password);
        const user = await User.update({
            username,
            password: passwordEncriptado,
        }, {
            where: {
                id,
            },
        });
    //    const user = await User.findOne({
    //        where: {
    //            id,
    //        },
    //    });
    //if (!user) res.status(404).json({ message: 'User not found'});
    //await user.update({
    //    username,
    //    status,
    //});
    //
        res.json(user);
    } catch (error) {
        next(error);
    }
}




async function deleteUser(req, res, next) {
    const { id } = req.params;
    try{
        await User.destroy({
            where: {
                id,
            },
        });
        res.status(204).json({ message: 'User deleted '});
    } catch (error) {
        next(error);
    }
}

async function activateInactive(req, res, next){
    const { id } = req.params;
    const { status } = req.body;
    try{
        if(!status) res.status(400).json({ message : "Status is required"});
        const user = await User.findByPk(id);
        if(!user) res.status(404).json({ message: 'User is not found '});
        if (user.status === status)
            res.status(409).json({ message: 'Same status'});

        user.status = status;
        await user.save();
        res.json(user);
    } catch (error){
        next(error);
    }
}

async function getTasks(req, res, next){
    const { id } = req.params;
    try{
        const user = await User.findOne({
            attributes: ['username'],
            include: [
                {
                    model: Task,
                    attributes: ['name', 'done'],
                    //where: {
                    //    done: false
                    //}
                }
            ], 
            where: {
                id
            }
        })
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export default{
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    activateInactive,
    getTasks
};