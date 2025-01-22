import {GridFsStorage} from 'multer-gridfs-storage'
import dotenv from 'dotenv'
import multer from 'multer';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


const storage = new GridFsStorage({
    url : `mongodb://${username}:${password}@ac-5po2a2a-shard-00-00.u9dhhg1.mongodb.net:27017,ac-5po2a2a-shard-00-01.u9dhhg1.mongodb.net:27017,ac-5po2a2a-shard-00-02.u9dhhg1.mongodb.net:27017/?ssl=true&replicaSet=atlas-mw38nv-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: {useNewUrlParser: true},
    file: (request , file) => {
        const match = ['image/png' , 'image/jpg'];

        if (match.indexOf(file.memeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }

})

export default multer({ storage });