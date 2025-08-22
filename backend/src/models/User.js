import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// Compare plain text password directly
userSchema.methods.comparePassword = async function (candidatePassword) {
  return candidatePassword === this.password;
};

const User = mongoose.model("User", userSchema);

export default User;

