let local = require('passport-local').Strategy;
let bcrypt = require('bcrypt');

let initialize= (passport,getEmail,getID) =>{
    let authenticate = async(email, password, done) => {
        let user = getEmail(email)
        if(user == null){
            return done(null, false, {message: 'User email does not exist'})
        }

        try{
            if (await bcrypt.comparePassword(password,user.password)){
                return done(null,user)
            }
            else{
                return done(null,false,{message:"Username and/or Password is incorrect "})
            }
        }
        catch(e){
            return done(e);
        }
    }

    passport.use(new LocalStrategy({username:'email'}, authenticate))
    passport.serializeUser((user,done)=> done(null,user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getID(id))
      })
}