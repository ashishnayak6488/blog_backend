import {GridFsStorage} from 'multer-gridfs-storage'
import dotenv from 'dotenv'
import multer from 'multer';

dotenv.config();

const URL = process.env.MONGO_URL;


const storage = new GridFsStorage({
    url : URL,
    
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