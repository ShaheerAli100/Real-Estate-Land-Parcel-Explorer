// const jwt=require('jsonwebtoken');
const express =require('express');
const router=express.Router();
const bcrypt=require('bcryptjs')
const authenticate=require("../middleware/authenticate")
const authenticateCus=require("../middleware/authenicateCus")
const authenticateAdmin=require("../middleware/authenticateAdmin")


require('../db/conn');
const User=require('../models/userSchema');
const Customer=require('../models/userSchemaTwo');
const Admin=require('../models/adminSchema');
router.get('/',(req,res)=>{
    res.send('hekko wordl from the server router jjs');
});

//AYSNC AWAIT
//Resgitser for society members
router.post('/register',async(req,res)=>{
    const {firstName,lastName,HouseAddress,email,password,confirmPassword,cnic,phoneNumber,parcel,space,purpose,rooms,bathrooms,bills,gas,electricity,water,internet,offer}=req.body;

    if(!firstName || !lastName || !HouseAddress || !email || !password || !confirmPassword || !cnic || !phoneNumber || !parcel || !space || !purpose || !rooms || !bathrooms || !bills || !gas || !electricity || !water || !internet || !offer){
        return res.json({error:"Please fill the field properly"});
    }

    try{
        const userExist=await User.findOne({email:email});
        
        if(userExist){
            return res.status(422).json({error:'Email already exist'});
        }else if(password!=confirmPassword){
            return res.status(422).json({error:'Password are not matching'});

        }else{
            const user=new User({firstName,lastName,HouseAddress,email,password,confirmPassword,cnic,phoneNumber,parcel,space,purpose,rooms,bathrooms,bills,gas,electricity,water,internet,offer});
        //hashing

        await user.save();
        res.status(201).json({message:"User Registered successfully"})
        }
        
    }catch(err){
        console.log(err);
    };
    // console.log(req.body.firstName); 
    // console.log(req.body.email); 
    // res.send("Hellop res send register");
    // res.json({message:req.body});
});

// REGISTER FOR CUSTOMER 

router.post('/registerForCustomer',async(req,res)=>{
    const {firstName,lastName,email,phone,password,confirmPassword}=req.body;

    if(!firstName || !lastName || !email || !phone || !password || !confirmPassword ){
        return res.json({error:"Please fill the field properly"});
    }

    try{
        const userExist=await Customer.findOne({email:email});
        
        if(userExist){
            return res.status(422).json({error:'Email already exist'});
        }else if(password!=confirmPassword){
            return res.status(422).json({error:'Password are not matching'});

        }else{
            const user=new Customer({firstName,lastName,email,phone,password,confirmPassword});
        //hashing

        await user.save();
        res.status(201).json({message:"User Registered successfully"})
        }
        
    }catch(err){
        console.log(err);
    };
});


//Login route
router.post('/signin',async(req,res)=>{

    try{
        let token;
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error: "please Fill the data"});
        }
        const userLogin= await User.findOne({email:email});
        // const customerLogin= await Customer.findOne({email:email});
        console.log(userLogin);
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);
            token=await userLogin.generateAuthToken();           
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000 ),
                httpOnly:true
            });
            if(!isMatch || !token){
                res.status(400).json({error:"Invalid credentials"})
            }else{
                res.json({message:"user signin successfully"})
            }
        }else{
            res.json({error:"Invalid credentials"})

        }
       
        
    }catch(err){
        console.log(err);
    }
});

//Login for customers
router.post('/signinForCustomers',async(req,res)=>{

    try{
        let token;
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error: "please Fill the data"});
        }
        const customerLogin= await Customer.findOne({email:email});
        // const customerLogin= await Customer.findOne({email:email});
        console.log(customerLogin);
        if(customerLogin){
            const isMatch=await bcrypt.compare(password,customerLogin.password);
            token=await customerLogin.generateAuthToken();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000 ),
                httpOnly:true
            });
            if(!isMatch){
                res.status(400).json({error:"Invalid credentials"})
            }else{
                res.json({message:"user signin successfully"})
            }
        }else{
            res.json({error:"Invalid credentials"})

        }
       
        
    }catch(err){
        console.log(err);
    }
});


//Signin for Admin
router.post('/signinForAdmin',async(req,res)=>{

    try{
        let token;
        const {name,password}=req.body;
        if(!name || !password){
            return res.status(400).json({error: "please Fill the data"});
        }
        const adminLogin= await Admin.findOne({name:name});
        if(adminLogin){
            const isMatch = password === adminLogin.password;
            token=await adminLogin.generateAuthToken();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000 ),
                httpOnly:true
            });
            
            if(!isMatch){
                res.status(400).json({error:"Invalid credentials"})
            }else{
                res.json({message:"user signin successfully"})
            }
        }else{
            res.json({error:"Invalid credentials"})

        }
       
        
    }catch(err){
        console.log(err);
    }
});


router.get('/about',authenticate,(req,res)=>{
    res.send(req.rootUser);
});

router.get('/aboutCustomer',authenticateCus,(req,res)=>{
    
    res.send(req.rootCustomer);
});
router.get('/aboutAdmin',authenticateAdmin,(req,res)=>{
    res.send(req.rootAdmin);
});

router.get('/logout',(req,res)=>{
    
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("user Logout");
})


router.get('/getMessage',authenticateCus,(req,res)=>{
    res.send(req.rootCustomer);

})

router.post('/contact',authenticateCus,async(req,res)=>{
    // res.send(req.rootCustomer);
    try{
        const {firstName,email,phone,message}=req.body;

        if(!firstName || !email || !phone || !message){
            console.log("error in contact form(What the hell)");
            return res.json({error: "plz fill the contact form"})
        }
        const userContact=await Customer.findOne({_id:req.CustomerID});
        if(userContact){
            const userMessage=await userContact.addMessage(firstName,email,phone,message);
            await userContact.save();
            res.status(201).json({message:"user Contacted successfully"});
        }

    }catch(error){
        console.log(error);
    }

});

router.get('/getMessageUser',authenticate,(req,res)=>{
    res.send(req.rootUser);

})
router.post('/contactUser',authenticate,async(req,res)=>{
    // res.send(req.rootCustomer);
    try{
        const {firstName,email,phoneNumber,message}=req.body;

        if(!firstName || !email || !phoneNumber || !message){
            console.log("error in contact form!");
            return res.json({error: "plz fill the contact form"})
        }
        const userContact=await User.findOne({_id:req.userID});
        if(userContact){
            const userMessage=await userContact.addMessage(firstName,email,phoneNumber,message);
            await userContact.save();
            res.status(201).json({message:"user Contacted successfully"});
        }

    }catch(error){
        console.log(error);
    }

});


//TEAMS BY ROUND
// router.get('/filterteams', async (req, res) => {
//     const rounds = await User.find();
//     const teamsByRound = [];

//     for (const round of rounds) {
//       const queryObject = { select_round: round };
//       const teams = await User.find(queryObject);
//       teamsByRound.push({ round, teams });
//     }
//     // res.render('schedulewiseteams.hbs', { teamsByRound });
//     console.log(teamsByRound);
//   });
router.get('/allUsers', async (req, res) => {
    try {
      const allUsers = await User.find().lean().exec();
      res.json(allUsers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete('/allUsers/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id).lean().exec();
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      res.json({ message: 'Subject deleted successfully' });
      } catch (err) {
      console.log('Error while deleting', err);
      res.status(500).json({ message: err.message });
    }
  });
  


  


module.exports=router;