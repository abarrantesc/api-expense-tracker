const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const PresupuestoSchema = mongoose.Schema({
    monto: Number,
    descripcion: String,
    titulo: String,
    autor: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' }

});

PresupuestoSchema.plugin(mongoosePaginate);  // Sirve para paginar 

module.exports = mongoose.model("Presupuesto",PresupuestoSchema);