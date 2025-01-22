import mongoose from "mongoose"

const Connection = async(username , password) =>{
    const URL = `mongodb://${username}:${password}@ac-5po2a2a-shard-00-00.u9dhhg1.mongodb.net:27017,ac-5po2a2a-shard-00-01.u9dhhg1.mongodb.net:27017,ac-5po2a2a-shard-00-02.u9dhhg1.mongodb.net:27017/?ssl=true&replicaSet=atlas-mw38nv-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
       await mongoose.connect(URL , {useNewUrlParser: true});
       console.log("Data base connected successfully")   
    } catch (error) {
        console.log("Error while connecting with the database" , error)
    }
}
export default Connection;