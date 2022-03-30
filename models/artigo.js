const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let artigoSchema = new Schema(
    {
        title: { type: String, required: true, maxlength: 250 },
        text: { type: String, required: true }
    }  
);

module.exports = mongoose.model("artigo", artigoSchema);

