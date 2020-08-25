var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var passportLocalMongoose = require("passport-local-mongoose");

var adminSchema=new Schema({

email:{
    type:String,
    default:""
}
});

adminSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('Admin',adminSchema);