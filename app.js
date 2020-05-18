//jshint esversion:6
//require module
const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");


//boiler plate code
const app= express();
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

//database connect
mongoose.connect("mongodb+srv://swagata:batman1234@cluster0-lbaxs.mongodb.net/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});
//schema for todo,work,grocery
 const itemSchema={
   name:String
 };
 const workSchema={
    name:String
  };
  const grocerySchema={
     name:String
   };

   //model  todo,work,grocery
const Drop=mongoose.model("Drop",itemSchema);
const Worke=mongoose.model("Worke",workSchema);
const Grocery=mongoose.model("Grocery",grocerySchema);
//new document loaded as soon as this is executed
const item1=new Worke({
  name:"Welcome to your to do list!"
});
const item2=new Worke({
  name:"<-Click on + button to add an item!"
});
const item3=new Worke({
  name:"<-Click here to delete an item!"
});
const item4=new Drop({
  name:"Welcome to your to do list!"
});
const item5=new Drop({
  name:"<-Click on + button to add an item!"
});
const item6=new Drop({
  name:"<-Click here to delete an item!"
});
const item7=new Grocery({
  name:"Welcome to your to do list!"
});
const item8=new Grocery({
  name:"<-Click on + button to add an item!"
});
const item9=new Drop({
  name:"<-Click here to delete an item!"
});

//store in default array new documents
const dayarray=[item4,item5,item6];
const workarray=[item1,item2,item3];
const groceryarray=[item7,item8,item9];


//get route for home page
app.get("/",function(req,res){

res.render("home");
});
//get route for today page
app.get("/day",function(req,res){
  Drop.find({},function(err,foundItems){
      if(foundItems.length ===0)
      {
        Drop.insertMany(dayarray,function(err){
          if (err)
          {
            console.log(err);
          }
          else
          {
            console.log("success");
          }
        });
        res.redirect("/day");
      }
        else
        {
          res.render('list',{Title:"Today ToDo", newListItem:foundItems});
        }


  });
});
//get route for work page
app.get("/work",function(req,res){
    Worke.find({},function(err,foundItems){
      if(foundItems.length ===0)
      {
    Worke.insertMany(workarray,function(err){
          if (err)
          {
            console.log(err);
          }
          else
          {
            console.log("success");
          }
        });
        res.redirect("/work");
      }
        else
        {
            res.render('list',{Title: "Work", newListItem:foundItems});
        }


  });


});

//get route for grocery page
app.get("/grocery",function(req,res){
Grocery.find({},function(err,foundItems){
      if(foundItems.length ===0)
      {
        Grocery.insertMany(groceryarray,function(err){
          if (err)
          {
            console.log(err);
          }
          else
          {
            console.log("success");
          }
        });
        res.redirect("/grocery");
      }
        else
        {
          res.render('list',{Title: "Grocery", newListItem:foundItems});
        }


  });

});
//post route for adding todo,work,grocery
app.post("/day",function(req,res){
const itemName=req.body.newItem;
  if(req.body.list ==="Work")
  {
    const item = new Worke({
      name:itemName
    });
    item.save();
    res.redirect("/work");
  }

  else if(req.body.list ==="Grocery")
  {
    const item = new Grocery({
      name:itemName
    });
    item.save();
    res.redirect("/grocery");
  }
 else{
   const item = new Drop({
     name:itemName
   });
   item.save();
   res.redirect("/day");

 }

});
//post route to delete
app.post("/delete",function(req,res)
{
  const checkedItemId=req.body.checkboxDelete;
   const hiddenList=req.body.hiddenlist;
   if(hiddenList ==="Work")
   {
      Worke.findByIdAndRemove(checkedItemId,function(err){
        if(!err)
        {

                  res.redirect("/work");
        }
          });
    }
   else if(hiddenList ==="Grocery")
   {
     Grocery.findByIdAndRemove(checkedItemId,function(err){
       if(!err)
       {

                 res.redirect("/grocery");
       }
         });
   }
else
{
  Drop.findByIdAndRemove(checkedItemId,function(err){
    if(!err)
    {

              res.redirect("/day");
    }
      });
}

});


//server connection
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function( ){
  console.log("successful connection at port 3000");
});
