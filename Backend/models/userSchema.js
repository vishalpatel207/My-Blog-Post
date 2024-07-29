import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must contain at least 3 characters"],
        maxlength: [32, "Name cannot exceed 32 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    phone: {
        type: Number,
        maxlength: [12, "Name cannot exceed 12 characters"],
        required: [true, "Phone number is required"],
    },
    avatar: {
        public_id: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        },
      },
    education: {
        type: String,
        required: [true, "Education is required"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: {
            values: ["Reader", "Author"],
            message: "Role must be either Reader or Author"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must contain at least 8 characters"],
        maxlength: [32, "Password cannot exceed 32 characters"]
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

// Use function keyword for pre-save hook to ensure correct context
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

// Use function keyword for method to ensure correct context
userSchema.methods.comparePassword = async function(enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (err) {
        throw new Error(err);
    }
};

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);
