const mongoose = require('mongoose');
let userSchema;
let users;
let URL="mongodb+srv://karan:1234@cluster0.fyj7aks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
async function connectdb() {
    try {
        await mongoose.connect(URL);
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
        await mongoose.disconnect(URL);
        console.log("disconnect to MongoDB");
    } catch (error) {
        console.error("Failed to disconnect to MongoDB:", error);
    }
}

async function insertUser(userObject) {
    try {
        const userExists = await finduser(userObject);
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
        const g1 = await users.findOne({email:finduserObj.email});
        const g2 = await users.findOne({password:finduserObj.password});
        if(g1 && g2)
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

module.exports={
    connectdb,
    makemodel,
    insertUser,
    deleteuser,
    disconnectdb,
    finduser
}
