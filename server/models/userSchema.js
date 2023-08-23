const jwt=require('jsonwebtoken');
const mongoose= require('mongoose'); 
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
   firstName:{
    type: String,
    required:true
   },
   lastName:{
    
    type: String,
    required:true
   },
   HouseAddress:{
    
    type: String,
    required:true
   },
   email:{
    
    type: String,
    required:true
   },
   password:{
    
    type: String,
    required:true
   },
   confirmPassword:{
    
    type: String,
    required:true
   } ,
   cnic:{
    
   type: String,
   required:true
     } ,
   phoneNumber:{
   
   type: String,
   required:true
   } ,
   parcel:{
      type: String,
      
   },
   space:{
      type: String,
      required:true
      } ,
   purpose:{
      type: String,
      required:true
      } ,
   rooms:{
      type: String,
      required:true
      } ,
   bathrooms:{
      type: String,
      required:true
      } ,  
   bills:{
      type: String,
      required:true
      } ,   
   gas:{
        type: Boolean,
        default: false

      } , 
   
   electricity:{
      type: Boolean,
      default: false
      } , 
   
   water:{
      type: Boolean,
      default: false
      } , 
   
   internet:{
      type: Boolean,
      default: false
      } , 
   offer:{
      type: String,
      required:true
      },  
      date:{
         type:Date,
         default:Date.now
      },
      messages:[
         {
            firstName:{
               type: String,
               required:true
              },
              email:{
               
               type: String,
               required:true
              },
              phoneNumber:{
               type:String,
               required:true
            },
              message:{
               type:String,
               required:true
              }
         }
      ],

   tokens:[{
      token:{
         type: String,
         required:true
      }
   }  
   ]
});


//we are hashing

// userSchema.pre('save', async function(next) {
//    console.log('just before saving');

//    const rounds = 10;

//    const hash = await bcrypt.hash(this.password, rounds);
//    this.password = hash;
//    next();
// });
userSchema.pre('save',async function(next){
   // console.log("hi im inside");
   if(this.isModified('password')){
      // console.log("hi im working");

      this.password=await bcrypt.hash(this.password,12);
      this.confirmPassword=await bcrypt.hash(this.confirmPassword,12);
   }
   next();
})
//we are generating token
userSchema.methods.generateAuthToken=async function(){
   try{
      let token=jwt.sign({_id:this._id}, process.env.SECRET_KEY);
      this.tokens=this.tokens.concat({token: token});
      await this.save();
      return token;

   }
   catch(err){
      console.log(err);
   }
}

userSchema.methods.addMessage=async function(firstName,email,phoneNumber,message){
   try{
      this.messages=this.messages.concat({firstName,email,phoneNumber,message});
      await this.save();
      return this.messages;
   }
   catch(error){
      console.log(error);
   }
}

//cpllection creatiom
const User=mongoose.model('USER',userSchema);


module.exports=User;