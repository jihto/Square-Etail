import { diskStorage } from "multer"; 
import { v4 as uuidv4 } from 'uuid'; 


export const storage = diskStorage({
    destination: (req, file, cb) => {
        const location: number = file.originalname.lastIndexOf('.') + 1;
        const typeFile: string = file.originalname.slice(location);
        let locationSaveFile: string = './src/common/uploads';
        if (typeFile === 'jpg' || typeFile === 'png' || typeFile === 'jpeg') {
            locationSaveFile += '/images';
        } else 
            return cb(new Error('Only image files are allowed!'),"");
        cb(null, locationSaveFile);
    },
    filename: (req, file, cb) => {
        const location: number = file.originalname.lastIndexOf('.') + 1;
        const typeFile: string = file.originalname.slice(location);
        const fileName: string = file.originalname.slice(0,location); 
        cb(null, `${fileName}${uuidv4()}.${typeFile}`);
    },
});