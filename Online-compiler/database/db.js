const mongoose = require('mongoose');
let userSchema;
let users;
async function connectdb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/DOcode');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}
function makemodel()
{
    userSchema = new mongoose.Schema({
        email: String,
        password: String
    });
    users = mongoose.model('users', userSchema);
}
async function disconnectdb() {
    try {
        await mongoose.disconnect('mongodb://127.0.0.1:27017/DOcode');
        console.log("disconnect to MongoDB");
    } catch (error) {
        console.error("Failed to disconnect to MongoDB:", error);
    }
}

async function insertUser(userObject) {
    try {
        const userExists = await finduser({ email: userObject.email });
        
        if (!userExists) {
            const newUser = new users({
                email: userObject.email,
                password: userObject.password
            });
            const savedUser = await newUser.save();
            console.log('User created successfully:', savedUser);
            return true;
        } else {
            console.log('User already exists!');
            return false;
        }
    } catch (error) {
        console.error('Error inserting user:', error.message);
    }
}

async function deleteuser(finduserObj)
{
    try {
        const deletedUser = await users.deleteOne({ email: finduserObj.email });
        console.log(`${deletedUser.deletedCount} user deleted`);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}
async function finduser(finduserObj)
{
    try {
        const getusers = await users.findOne({email:finduserObj.email});
        if(getusers)
        {
            return true;
        }
        else
        {
            return false;
        }
    } catch (error) {
        console.error('Error searching users:', error);
    }
}

//connectdb()
//makemodel()
//console.log( is_user_already_exist({ email: 'emailtokaranmishra@gmail.com', password: '98098'}));
//insertUser({ email: 'emailtokaranmishra@gmail.com', password: '98098'})
//deleteuser({ email: 'emailtokaranmishra@gmail.com', password: '98098'})
//disconnectdb()

module.exports={
    connectdb,
    makemodel,
    insertUser,
    deleteuser,
    disconnectdb,
    finduser
}