import React, { useState } from 'react'
import Cropper from 'react-easy-crop'; 
import getCroppedImg from '../utils/cropImage';
import GroupButton from './buttons/GroupButon';

interface ImageCropProps{
  url: string;
  onClose: () => void;
  onComplete: (newUrl: string, file: File) => void;
}

const ImageCrop:React.FC<ImageCropProps> = ({
  url, 
  onClose,
  onComplete,
}) => {
  const [crop, onCropChange] = useState<{x:number, y: number}>({ x: 0, y: 0 })
  const [zoom, onZoomChange] = useState<number>(1);  
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }
  const showCroppedImage = async () => {
    try {
      if(url && croppedAreaPixels ){
        const newCroppedImage = await getCroppedImg(url, croppedAreaPixels); 
        if(newCroppedImage){
          const blob = await fetch(newCroppedImage).then((r) => r.blob());
          const file = new File([blob], 'croppedImage.jpg', { type: blob.type });
          onComplete(newCroppedImage, file);
          onClose();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }; 
  return (
    <> 
      {
        url && (
          <div className='w-full h-96 relative rounded-lg'>
            <Cropper 
              image={url}
              crop={crop}
              zoom={zoom}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onMediaLoaded={(mediaSize) => {
                // Adapt zoom based on media size to fit max height
                onZoomChange(400 / mediaSize.naturalHeight)
              }}
              onCropComplete={onCropComplete}
            />
          </div>
        )
      }
      {/* {croppedImage && <img className='' src={croppedImage}/> } */}
      <div className='grid absolute bottom-0 grid-cols-2 w-1/2 mt-2'> 
        <GroupButton
          action={showCroppedImage}
          label={"Crop"}
          labelSecondary={"Cancel"}
          secondAction={onClose}
          secondaryButtonClass='bg-gray-400 text-white'
          primaryButtonClass='bg-red-400 text-white'
        />
      </div>
    </>
  )
}


export default ImageCrop;