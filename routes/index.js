var express = require('express');
var router = express.Router();
var userModel=require("./users");
const passport = require('passport');
//--es dono ke wajah se banda login kar payega--->
const localStrategy = require("passport-local");

passport.use(new localStrategy(function(){userModel.authenticate()}));
//<------
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/profile',isLoggedIn ,function(req, res) {
  res.send("welcome");
});

  router.post('/register',async function(req,res){
    var userdata =await new userModel({
      username:req.body.username,
      secret:req.body.secret
    });
   // --->
   userModel.register(userdata , req.body.password, async function(err, registeredUser){
    // .then(function(_registereduser){
    //   //<--- eatne code se user ka account ban gaya
    //   //---->
    if (err) {
      console.error('Error registering user:', err);
      // Handle the error, for example:
      return res.render('register', { error: err.message });
  }
     await passport.authenticate("local")(req,res,function(){
        res.redirect('/profile');
      });
      //<-----eatne code se acoount bante hi login ho gaya
    })
  }); 

  //login route-->
  router.post("/login",passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect:"/"
  }),function(req ,res){})

  router.get("/logout" , function(req, res ,next){
    req.logout(function(err){//logout karna chaahta hai to logout kar dijiye or slash page wapas kar dijiye
      if(err){ return next(err);}
      res.redirect("/");
    });
  });
//-->eska matlab par bhi aapne isLoggedIn laga diya pahile check karega req is Authenticate hai
  function isLoggedIn(req , res ,next){
    if(req.isAuthenticated()){//eska matlab aap loggedIn ho
      return next();//agar aap loggedIn ho to aage badho
    }
    res.redirect("/");//nhi ho wapas jao .shlas pe
  }
   //creation user---->
// router.get('/create',async function(req, res){
//  const userdata= await userModel.create({
//   username: "royula",
//   nickname: "royulaaaa",
//   description:"hello everyone",
//   categories:['fashion' , 'life' ,'science'],
//   })
//   res.send(userdata);
// })
//<-----

//---intermediate mongodb---
//1-- router.get('/find' ,async function(req ,res){
//  var regex= new RegExp("^Raushan$" ,'i')
//  let user= await userModel.find({username:regex});
//  res.send(user);
// })

//2---
// router.get('/find' ,async function(req ,res){
//   //saare bande dhoondho
//    let user= await userModel.find({categories:{$all:['fashion']}});
//    res.send(user);
//   })

//3---$gte->greaterequal  to $lte->leassequal
// router.get('/find' ,async function(req ,res){
//   var date1=new Date('2023-11-29');
//   var date2=new Date('2023-12-01');
//   let user= await userModel.find({datecreated:{$gte:date1 ,$lte:date2}});
//   res.send(user);
//   })

//4---jo data exits karta hai use access karo
// router.get('/find' , async function(req , res){
//   //filter out means jo data exit karta hai use print karo
//   var user= await userModel.find({categories:{$exists:true}});
//   res.send(user);
// })
//5<------specific field ->
// router.get('/find' , async function(req , res){
//   //specific field lenght ke under hi saare bande ko dhiidhna hai .
// //$expr-->scenario ko handle karne ke liye,complex sitution ko handle karne ke liye
//   var user= await userModel.find({
//     $expr:{
//       $and:[
//         {$gte:[{$strLenCP:'$nickname'},0]},
//         {$lte:[{$strLenCP:'$nickname'},12]}
//       ]
//     }
//   });
//   res.send(user);
// })


module.exports = router;
