const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// sign-up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check username length is more than 3
        if (username.length < 4) {
            return res
                .status(400)
                .json({ message: "Username length should be greater than 3" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res
                .status(400)
                .json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res
                .status(400)
                .json({ message: "Email already exists" });
        }

        // Check password length
        if (password.length <= 5) {
            return res
                .status(400)
                .json({ message: "Password's length should be greater than 5" });
        }
     const hashPass =await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address,
        });


        await newUser.save();
        return res.status(200).json({ message: "SignUp successfully" });

    } catch (error) {
        console.error('Signup error:', error);  // Log detailed error
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// sign-in
router.post("/sign-in", async (req, res) => {
    try {
        const {username,password} = req.body;
        
        const existingUser = await User.findOne({username});
        if(!existingUser){
            res.status(400).json({ message: "Invalid credentials", error: error.message });
        }

        await bcrypt.compare(password,existingUser.password,(err,data) =>{
         if(data){
            const authClaims =[
                { name: existingUser.username },
                { role: existingUser.role },
            ];
            const token = jwt.sign({authClaims},"bookStore123",{
                expiresIn:"30d",
            });
                res
                .status(200)
                .json({ 
                    id: existingUser._id,
                    role: existingUser.role,
                    token:token,

                });
         }
         else{
            res.status(400).json({ message: "Invalid credentials", error: error.message });
         }
        });
    } catch (error) {
        console.error('Signup error:', error);  // Log detailed error
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});




module.exports = router;
