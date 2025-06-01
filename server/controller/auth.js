const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Uschema = require('../schema/user')

exports.signIn = async (req,res)=>{
    try {
        const {password,email} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassowrd = await bcrypt.hash(password, salt)
        const userToBeAdded =  new Uschema({...req.body,password:hashPassowrd, confirm_password:hashPassowrd}) 
        const dataToBeSaved = await userToBeAdded.save()
        const token = jwt.sign({ email,password}, process.env.SECRET, { expiresIn: '1h' });
        res.send({token,name:userToBeAdded.username,userID:userToBeAdded._id,image:userToBeAdded.profilePicture,msg:"Sign in successfull!"})
    } catch (error) {
        console.log(error)
    }
}
exports.logIn = async (req,res)=>{
        try {
            const {email,password} = req.body
            const mailVerify = await Uschema.findOne({email:email})
            if(mailVerify){
                const passwordVerify = await bcrypt.compare(password,mailVerify.password)
                if(passwordVerify){
                    const token = jwt.sign({ email,password}, process.env.SECRET, { expiresIn: '1h' });
                    res.redirect(`http://localhost:3000/google-auth-success?token=${token}`);
                    res.send({token,userID:mailVerify._id,name:mailVerify.username,image:mailVerify.profilePicture})
                }else{
                    res.status(401).send("passowrd  is incorrect")
                }
            }else{
                res.status(404).send("User does not exist")
            }
        } catch (error) {
            console.log(error)
        }
    }

exports.getDataById = async (req,res)=>{
    try {
        const data = await Uschema.findById(req.params.id)
        res.send({data,msg:"get the data"})
    } catch (error) {
        console.log(error)
    }
}
