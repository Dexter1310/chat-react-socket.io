import {mongoose} from "mongoose";

var Schema = mongoose.Schema;

var NickUserSchema= new Schema({
    user:String,
    client:String
})

export default mongoose.model('nickUser',NickUserSchema)