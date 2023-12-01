const mongoose= require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testingendgame2");
const userSchema=mongoose.Schema({
  username:String,
  secret:String
});
// userSchema.plugin(plm);
 module.exports=mongoose.model("user" , userSchema);

 // username: String,
  // nickname: String,
  // description:String,
  // categories:{
  //   type:Array,
  //   default:[]
  // },
  // datecreated:{
  // type:Date,
  // default: Date.now()
  // }