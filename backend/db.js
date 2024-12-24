const mongoose = require('mongoose');
const bycrpt = require('bcrypt');


// mongoose.connect("mongodb://localhost:27017/paytm?replicaSet=rs0", {
mongoose.connect("mongodb+srv://learnhk:learnhk1234@cluster0.i70lm.mongodb.net/paytm", {
  // serverSelectionTimeoutMS: 50000
}).then(() => {
  console.log("Connected to MongoDB");
}
).catch(err => {
  console.error("Error connecting to MongoDB", err);
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
})

userSchema.methods.createHash = async function () {
  this.password = await bycrpt.hash(this.password, 10);
}

userSchema.methods.validatePassword = async function (password) {
  return await bycrpt.compare(password, this.password);
}

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  balance: {
    type: Number,
    required: true,
  }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account
};