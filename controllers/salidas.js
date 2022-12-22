const Salida = require("../models/salidas");

// Functions

function createSalida(req,res){

    const salida = new Salida(req.body);


    salida.save((error, salidaStored) =>{
        if(error){
                res.status(400).send({msg: "Error al crear salida"});
        }else{
            res.status(200).send({msg: "Salida creada"});
        }
    });

};

 function getSalidas(req,res){
    const {page = 1, limit = 10 } = req.query;  // paginar 
    

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Salida.paginate({},options,(error,salidas) => {
        if(error){
            res.status(400).send({msg: "Error al obtener salidas"});
        }else{
            res.status(200).send(salidas);
        }
    });  
}; 


function updateSalidas (req,res){
    const { id } = req.params;
    const SalidaData  = req.body;


    Salida.findByIdAndUpdate({ _id: id},SalidaData,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al actualizar salida"});
        }else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });
}


function deleteSalidas(req,res){

    const { id } = req.params; 
   
    Salida.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al eliminar el salida"});
        }else{
            res.status(200).send({msg: "Entrada eliminado"});
        }
    });

}

module.exports = {
    createSalida,
    getSalidas,
    updateSalidas,
    deleteSalidas
};