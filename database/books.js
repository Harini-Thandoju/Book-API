const mongoose = require("mongoose")
const { publications } = require(".")
//create book schemes
const BookSchema=mongoose.Schema({
    ISBN:String,
    title:String,
    authors:[Number],
    language:String,
    PubDate:String,
    numOfPageL:Number,
    category:[String],
    publication:Number
});
const BookModel=mongoose.model("books",BookSchema);//model is attacking mongodb books collection it gives books model  following schema in mongo bdb
module.exports=BookModel; 