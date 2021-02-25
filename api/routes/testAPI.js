var express = require("express")   
var router = express.Router();
  
const fs = require('fs');
const testFolder = "./files";
let dirBuff = Buffer.from(testFolder);

fs.readdir(testFolder, (err, files) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("\nCurrent directory filenames:"); 
      files.forEach(file => { 
        console.log(file); 
      }) 
    } 
  }) 

router.get("/", function(req,res,next){
    fs.readdir(testFolder, (err, files) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("\nCurrent directory filenames:"); 
          res.send(files);
        } 
      }) 
});

module.exports=router;