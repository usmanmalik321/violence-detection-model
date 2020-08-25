var mongoose= require('mongoose');
var Schema=mongoose.Schema;
var recordSchema=new Schema({
    culprits: {
      type:String,
      required:true
    },
    image: {
     type:Array
    },
    video: {
        type:String,
        required:true
      },
    date: {
      type:String
    },
    time: {
      type:String
    }
    });
module.exports=mongoose.model('Record',recordSchema);