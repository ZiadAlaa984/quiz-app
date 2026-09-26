import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
},{
    timestamps:true
})

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User",userSchema);

export default User;