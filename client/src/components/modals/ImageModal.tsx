import Modal from './Modal'
import useImageModal from '../../hooks/useImageModal'  
import { Button } from '../buttons/Button'; 
import { useState } from 'react';
import IconButton from '../buttons/IconButton';
import ImageCrop from '../ImageCrop';
import { CiCrop, CiImageOn } from 'react-icons/ci';

const ImageModal = () => {
  const { isOpen, onClose, onSetImage } = useImageModal();    
  const [data, setData] = useState<File | null>(null); 
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
        setData(file);        
      }); 
      reader.readAsDataURL(file);
    };
    const handleCloseCrop = () => setShowCrop(false);
    const handleCompleteCrop = (newUrl: string, file: File) => { 
        setImageSrc(newUrl); 
        setData(file);
    }; 
    const handleChoose = () => { 
        if(data) {
            onSetImage(data); 
            onClose();
        }
    };
  return (
        <Modal
          title="Upload images search "
          className="w-[95%] md:w-1/2 xl:w-1/3 h-fit"
          onClose={onClose}
          isOpen={isOpen}
        >
          <div className="w-full h-fit grid gap-5"> 
            <div className='grid gap-2'>
              <div className='w-full bg-white border-2 border-dashed flex-center text-gray-400 border-gray-400 h-96 rounded-lg relative'> 
                  <IconButton className={`absolute right-1 bg-white text-black top-1 shadow-lg z-10`} hanldeClick={()=> setShowCrop(true)} icon={CiCrop} />
                  {
                      imgSrc 
                          ? showCrop 
                                  ? <ImageCrop url={imgSrc} onComplete={handleCompleteCrop}  onClose={handleCloseCrop}/>
                                  : <img className='w-full h-96 object-cover rounded-lg p-1' src={imgSrc}  alt='upload'/>
                          : <CiImageOn size={60}/>
                  } 
              </div>
              <div className='flex gap-5 justify-end items-center'>
                  <input 
                      type='file' 
                      accept='image/*'  
                      onChange={onSelectFile}
                      className="block p-1 shadow rounded-full bg-gray-200 w-fit text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
                  />
                  <Button className=' bg-gray-700 text-sky-300 hover:bg-gray-600' handleSubmit={handleChoose}>Choose</Button>
              </div>
          </div>   
        </div>  
      </Modal>
  )
}


export default ImageModal