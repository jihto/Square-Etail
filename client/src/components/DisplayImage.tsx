

import { Dispatch, SetStateAction, useState } from 'react'
import IconButton from './buttons/IconButton';
import ImageCrop from './Crop/ImageCrop';
import { CiCrop } from 'react-icons/ci'; 

interface DisplayImageProps{ 
    onGetImage: Dispatch<SetStateAction<File | null>>;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ 
    onGetImage
}) => {  
    const [showCrop, setShowCrop] = useState<boolean>(false); 
    const [imgSrc, setImageSrc] = useState<string>("");
    const onSelectFile = (e: any) => {
        const file = e.target.files?.[0]; 
        if (!file) return; 
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;   
            setImageSrc(imageUrl)
            onGetImage(file);        
        });
        reader.readAsDataURL(file); 
    }; 
    const handleCloseCrop = () => setShowCrop(false);
    const handleCompleteCrop = (newUrl: string) => {}; 
    return ( 
        <div className='grid gap-2'>
            <div className='w-full bg-white border-[1px] border-gray-400 shadow-md h-96 rounded-lg relative'> 
                <IconButton className={`absolute right-1 top-1 shadow-lg z-10`} hanldeClick={()=> setShowCrop(true)} icon={CiCrop} />
                {
                    imgSrc 
                        ? showCrop 
                                ? <ImageCrop url={imgSrc} onComplete={handleCompleteCrop}  onClose={handleCloseCrop}/>
                                : <img className='w-full h-96 object-contain' src={imgSrc}  alt='upload'/>
                        : <img className='w-full h-96 object-contain' src="public/images/addImage.png" alt="default" />
                } 
            </div>
            <div className='flex justify-end'>
                <input 
                    type='file' 
                    accept='image/*'  
                    onChange={onSelectFile}
                    className="block p-1 shadow rounded-full bg-gray-200 w-fit text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
                />
            </div>
        </div>
    )
}

export default DisplayImage