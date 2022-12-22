const Presupuesto = require("../models/presupuesto");

// Functions

function createPresupuesto(req,res){

    const presupuesto = new Presupuesto(req.body);


    presupuesto.save((error, presupuestoStored) =>{
        if(error){
                res.status(400).send({msg: "Error al crear presupuesto"});
        }else{
            res.status(200).send({msg: "presupuesto creado"});
        }
    });

};

  function getPresupuesto(req,res){
    const {page = 1, limit = 10 } = req.query;  // paginar 

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Presupuesto.paginate({},options,(error,presupuesto) => {
        if(error){
            res.status(400).send({msg: "Error al obtener presupuesto"});
        }else{
            res.status(200).send(presupuesto);
        }
    });  
}; 

function updatePresupuesto (req,res){
    const { id } = req.params;
    const PresupuestoData  = req.body;


    Presupuesto.findByIdAndUpdate({ _id: id},PresupuestoData,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al actualizar presupuesto"});
        }else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });
}

function deleteCourse(req,res){

    const { id } = req.params; 
   
    Course.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al eliminar el curso"});
        }else{
            res.status(200).send({msg: "Curso eliminado"});
        }
    });

}


module.exports = {
    createPresupuesto,
    getPresupuesto,
    updatePresupuesto
};