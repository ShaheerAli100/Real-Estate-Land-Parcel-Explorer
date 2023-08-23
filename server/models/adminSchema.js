const jwt=require('jsonwebtoken');
const mongoose= require('mongoose'); 


const adminSchema=new mongoose.Schema({
   name:{
    type: String,
    required:true
   },
   password:{
    type: String,
    required:true
   },
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
//we are generating token
adminSchema.methods.generateAuthToken=async function(){
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


//cpllection creatiom
const admin=mongoose.model('ADMIN',adminSchema);


module.exports=admin;