const Entrada = require("../models/entradas");

// Functions

function createEntrada(req,res){

    const entrada = new Entrada(req.body);


    entrada.save((error, entradaStored) =>{
        if(error){
                res.status(400).send({msg: "Error al crear entrada"});
        }else{
            res.status(200).send({msg: "Entrada creada"});
        }
    });

};

 function getEntradas(req,res){
    const {page = 1, limit = 10 } = req.query;  // paginar 
    

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Entrada.paginate({},options,(error,entradas) => {
        if(error){
            res.status(400).send({msg: "Error al obtener entradas"});
        }else{
            res.status(200).send(entradas);
        }
    });  
}; 


function updateEntradas (req,res){
    const { id } = req.params;
    const EntradaData  = req.body;


    Entrada.findByIdAndUpdate({ _id: id},EntradaData,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al actualizar entrada"});
        }else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });
}


function deleteEntradas(req,res){

    const { id } = req.params; 
   
    Entrada.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al eliminar el entrada"});
        }else{
            res.status(200).send({msg: "Entrada eliminado"});
        }
    });

}


module.exports = {
    createEntrada,
    getEntradas,
    updateEntradas,
    deleteEntradas

};