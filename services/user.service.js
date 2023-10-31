import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
const Userservice = {

  signup: async (userData) => {
    try {
      const existingUser = await User.findOne({ email: userData.email });

      if (existingUser) {
        throw new Error("Email already exists.");
      }

      const hashedPassword = bcrypt.hashSync(userData.password, 8);

      const user = new User({
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role,
        password: hashedPassword,
      });

      await user.save();

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  signin: async (email, password) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("No user found.");
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        throw new Error("Invalid Password!");
      }
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.API_SECRET,
        {
          expiresIn: 86400,
        }
      );

      return {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
        },
        message: "Login successful",
        accessToken: token,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  get: async (query) => {
    const pipeline = [];

    
 
    if (query.fullName) {
      pipeline.push({
        $match: {
          fullName: query.fullName,
        },
      });
    }
    if (query.search) {
      pipeline.push({
        $match: {
          $or: [
            { fullName: { $regex: query.search, $options: "i" } },
            { email: { $regex: query.search, $options: "i" } },
          ],
        },
      });
    }

    if(pipeline.length<=0){
      return User.find()
    }else{
       return await User.aggregate(pipeline);
    }
    
  },
  delete: async (id) => {
    return User.findByIdAndDelete(id);
  },
};
export { Userservice };
