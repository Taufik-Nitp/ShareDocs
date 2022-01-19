
// import {mongoose} from "mongoose"

const mongoose=require("mongoose")

const documentSchema= mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    document:{
        type: Object,
        required: true
    }
})
const Document=mongoose.model("document",documentSchema);

// export default document
module.exports={Document}