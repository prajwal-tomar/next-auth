import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide your username"],
  },
  password: {
    type: String,
    required: [true, "Please provide your username"],
  },
});

const User = mongoose.model("users", userSchema);

export default User;
