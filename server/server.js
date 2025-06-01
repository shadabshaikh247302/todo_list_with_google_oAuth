const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const morgan = require('morgan')
const dotenv = require('dotenv')
// const { mongoDBconnect } = require("./config/dbs")  
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
dotenv.config({path:"./config/config.env"})
const { mongoDBconnect } = require("./config/dbs");
const Uschema = require("./schema/user");

mongoDBconnect()
const app = express()
app.use(cors())

app.use(passport.initialize());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:7000/auth/google/callback"
},
async function(accessToken, refreshToken, profile, done) {
  try {
    // Find existing user by Google ID in DB
    let user = await Uschema.findOne({ googleId: profile.id });
    
    if (!user) {
      // If user does not exist, create new user
      user = await Uschema.create({
         googleId: profile.id,
         username: profile.displayName,
        //  firstName: profile.name.givenName,
            // lastName: profile.name.familyName,
            email: profile.emails?.[0]?.value,
            profilePicture: profile.photos?.[0]?.value,
      });
      console.log(user,"------------------------------------------");
    }

    return done(null, user); // now 'user' is defined
  } catch (error) {
    return done(error, null);
  }
}));



passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));
app.get("/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;

    // ✅ Now extract details from req.user, not profile
    const payload = {
      id: user._id,
      googleId: user.googleId,
      username: user.username,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
    };
    console.log(payload,"|||||||||||||||||||||||||||||||||||||||||");
    
    const secret = process.env.JWT_SECRET || "your_default_secret"; // ✅ Use a proper JWT secret
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    // ✅ Redirect with token in URL query
res.redirect(`http://localhost:3000/dashboard/token=${token}&name=${encodeURIComponent(payload.username)}&userID=${payload.id}`);
  }
);

app.use(bodyParser.json({
    limit:"30mb"
}))
app.use(morgan("dev"))

app.get("/",(req,res)=>{
    try {
        res.send("Hello I am your Server")
    } catch (error) {
        console.log(error)
    }
})

app.use('/auth',authRouter)

app.use('/user',userRouter)

app.listen(process.env.PORT,()=>{console.log("yourr server is running")})