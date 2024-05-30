import Modal from './Modal'
import useSearchImageModal from '../../hooks/useSearchImageModal'
import ImageCrop from '../Crop/ImageCrop';
import { useState } from 'react';
import IconButton from '../buttons/IconButton';
import { CiCrop } from 'react-icons/ci';
import { Button } from '../buttons/Button';

const SearchImageModal = () => {
  const searchImageModal = useSearchImageModal();
  
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const [showCrop, setShowCrop] = useState<boolean>(false);
  const onSelectFile = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl; 
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };
  
  const handleCloseCrop = () => setShowCrop(false);
  const handleCompleteCrop = (newUrl: string) => setImgSrc(newUrl);
 

  const handleCloseModal = () => {
    if(imgSrc === null) return;
    searchImageModal.onSetImageSearch(imgSrc)
    searchImageModal.onClose()
  }
  if(!searchImageModal.isOpen)
    return null; 
  return (
        <Modal
            content={
              <div className="w-full h-fit grid gap-5">
                <p className='font-medium text-xl'>Upload images search</p> 
                <div className='flex justify-between'>
                  <input 
                    type='file' 
                    accept='image/*'  
                    onChange={onSelectFile}
                    className="block p-1 rounded-full bg-gray-200 w-fit text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
                  />
                </div>
                <div className='w-full bg-gray-200 h-96 rounded-lg relative mb-10'> 
                  <IconButton className={`absolute right-1 top-1 shadow-lg z-10`} hanldeClick={()=> setShowCrop(true)} icon={CiCrop} />
                  {
                    imgSrc ?
                      showCrop 
                        ? <ImageCrop url={imgSrc} onComplete={handleCompleteCrop}  onClose={handleCloseCrop}/>
                        : <img className='w-full h-96 object-contain' src={imgSrc}  alt='upload'/>
                    : <img className='w-full h-96 object-contain' src="public/images/addImage.png" alt="default" />
                  } 
                </div>
                
              <div className='flex justify-end'>  
                  <Button className=' bg-gray-700 text-sky-300 hover:bg-gray-600' handleSubmit={handleCloseModal}>Choose</Button>
              </div>
              </div>
            }
            className="w-[95%] md:w-2/3 xl:w-1/2 h-fit"
            hanldeClose={()=>searchImageModal.onClose()}
            isOpen={searchImageModal.isOpen}
        /> 
  )
}


export default SearchImageModal