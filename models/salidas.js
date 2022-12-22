const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
//const User = mongoose.model('User');

const SalidasSchema = mongoose.Schema({
    articulo: String,
    descripcion: String,
    precio: Number,
    autor: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' }
});

SalidasSchema.plugin(mongoosePaginate);  // Sirve para paginar 

module.exports = mongoose.model("Salida",SalidasSchema);