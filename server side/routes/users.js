var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var passport = require("passport");
var authenticate = require("../authenticate");
var record= require('../models/record');
var ps = require('python-shell');
var sizeof = require('object-sizeof');
var http = require('http');
var io = require('socket.io')(http);
var Blob = require('node-blob');

const Users = require("../models/admin");
var r;
var r=new record;
/* GET users listing. */
let options = {
  // mode: 'text',
  // //pythonPath: '/usr/bin/python',//only enable it if you have python installed different from default location
  // pythonOptions: ['-u'], // get print results in real-time
  scriptPath: 'D://project/python/fd',//Path to your python script
  //If you want to add some variable that can be accessed in Python script by system.value1 etc
};



var setpermission=function(req,res,next){
  res.setHeader('Access-Control-Allow-Methods','*')
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers','*')
  res.setHeader('Access-Control-Allow-Credentials',true);
  next();
}
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });
router.get('/live',setpermission, function(req, res, next) {
 res.json("done");
 run();
});
router.get('/api/',setpermission, function(req, res, next) {
  record.find({}).exec(function(error, results) {
    if (error) {
        return next(error);
    }
    // Respond with valid data
    res.json(results);
});
});
//adding dummy data
//upload.single('picture'),

router.post("/signup", (req, res, next) => {
  try {
    Users.register(
      new Users({
        username: req.body.username,
        email:req.body.email
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        } else {
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            
            res.json({ success: true,User:req.user, status: "Registration Successful!"});
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});
router.post("/login", passport.authenticate("local"), (req, res) => {     
  console.log(req.body)
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are successfully logged in!",
    User: req.user,
  });
});

router.post('/add',setpermission, function(req, res, next) {
  r.culprits = req.body.culprits;
  r.video = req.body.video;
 r.image=req.body.images;
 r.date=req.body.date;
 r.time=req.body.time;
  r.save((err, result) => {
      console.log(result)

      if (err) return console.log(err)
      console.log('saved to database')
      res.send(r);
  })}
);
// router.get('/record/:id',setpermission, function(req, res, next) {
//   record.findById(req.params.id,function(err, doc) {
//       if (err) return next(err);
//       res.contentType(doc.image.contentType);
//       res.send(doc.image.data);   
//   });
// });
router.get('/record/:pname',setpermission, function(req, res, next) {
  fs.readFile('./uploads/'+req.params.pname, function(err, data) {
    if (err) throw err;
    res.writeHead(200, {'Content-Type': 'image/jpg'})
    res.end(data)


})});
router.get('/record/stream/:id',setpermission, function(req, res, next) {
  record.findById(
      req.params.id,
      function(err, doc) {
          if (err) return next(err);
         else{
          const path = 'assests/'+doc.video;
          const stat = fs.statSync(path)
          const fileSize = stat.size
          const range = req.headers.range
        
          if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
              ? parseInt(parts[1], 10)
              : fileSize-1
        
            if(start >= fileSize) {
              res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
              return
            }
            
            const chunksize = (end-start)+1
            const file = fs.createReadStream(path, {start, end})
            const head = {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunksize,
              'Content-Type': 'video/mp4',
            }
        
            res.writeHead(206, head)
            file.pipe(res)
          } else {
            const head = {
              'Content-Length': fileSize,
              'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
          }
          
         }     
})});

router.get('/live/n',setpermission, function(req, res, next) {
  res.json("hello");
});
// const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
//   const byteCharacters = atob(b64Data);
//   const byteArrays = [];

//   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     const slice = byteCharacters.slice(offset, offset + sliceSize);

//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }

//   const blob = new Blob(byteArrays, {type: contentType});
//   return blob;
// }
function run(){
  ps.PythonShell.run('nnlive.py', options, function(err, results) {
    if (err) throw err;
  
    
})
// ps.PythonShell.run('nnlive.py', options);
}
module.exports = router;
