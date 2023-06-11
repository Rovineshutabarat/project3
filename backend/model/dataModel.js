import mongoose from "mongoose";

const dataShema = mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        nim:{
            type:Number,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        kelas:{
            type:String,
            require:true
        }
    },
    {
        timestamps:true
    }
)
 
const Data = mongoose.model('Data' , dataShema)

export default Data