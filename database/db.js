import mongoose from "mongoose"

const Connection = async(MONGO_URL) =>{
    const URL = MONGO_URL;
    try {
       await mongoose.connect(URL , {useNewUrlParser: true});
       console.log("Data base connected successfully")   
    } catch (error) {
        console.log("Error while connecting with the database" , error)
    }
}
export default Connection;