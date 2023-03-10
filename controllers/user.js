const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const image = require("../utils/image");

async function getMe(req,res){

    const {user_id} = req.user;


    const response = await User.findById(user_id);  // Busca el usuario en DB 

    if(!response){
        res.status(400).send({msg: "NO se ha encontrado usuario"});
    }else{
        res.status(200).send(response);
    }
}



async function getUsers(req,res){

    const {active} = req.query;

    let response = null;

    if(active===undefined){  // Si esta indefinido el usuario (el usuario no ingreso un usuario en especifico) entonces devuelve todos
        response = await User.find();
    }else{
        response = await User.find({active}); // Devuelve los activos 
    }
    res.status(200).send(response);
};



async function createUser(req,res){
     
    const {password } = req.body;
    const salt = bcrypt.genSaltSync(10);   // genera encriptacion de password 
    const hashPassword = bcrypt.hashSync(password,salt); // Genera encriptacion de password

    const user = new User({...req.body, active: false, password: hashPassword }); // creo el objeto User con los datos, inactivo y el password encriptado
    
    if(req.files.avatar){      // Obtiene el path de la imagen segun el usuario.
        const imagePath = image.getFilePath(req.files.avatar);
        user.avatar = imagePath;

        console.log(imagePath);
    }

    user.save((error,userStored) => {  // guarda usuario en DB
        if(error){
            res.status(400).send({msg:"Error al crear el usuario"});
        }else{
            res.status(201).send(userStored);
        }
    });

};


async function updateUser(req,res){  // Actualiza usuario 
    const { id } = req.params;
    const userData  = req.body;

    //Password encriptar
    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password,salt);
        userData.password = hashPassword;
    }else{
        delete userData.password; // en caso de que llegue vacio 
    }
    //avatar actualizar 
    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar);
        userData.avatar = imagePath;

    }
    
    User.findByIdAndUpdate({ _id: id},userData,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al actualizar el usuario"});
        }else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });
}

async function deleteUser(req,res){  // Elimina usuario

    const { id } = req.params; 
   
    User.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al eliminar el usuario"});
        }else{
            res.status(200).send({msg: "Usuario eliminado"});
        }
    });
};


module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};

// Video 50 

