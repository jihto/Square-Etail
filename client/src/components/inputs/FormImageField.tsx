import { CiImageOn, CiPaperplane } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";    
import { useState } from "react";  

interface FormImageFieldProps {
    placeholder: string;
    onSubmit: (content: string, file?: File | null) => void;
    disabled?: boolean; 
    error: string | null;
    image?: boolean;
}

const FormImageField: React.FunctionComponent<FormImageFieldProps> = ({
    placeholder,
    onSubmit, 
    disabled , 
    error = null,
    image = true,
}) => {    
    const [content, setContent] = useState<string>(""); 
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); 
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>setContent( event.target.value); 
    const handleClear = () => { setContent(""); setPreviewUrl(null) };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file ?? null); 
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    }; 

    const handleSubmit = () => {
        onSubmit(content, selectedFile);  
        setContent(""); 
        setPreviewUrl(null);
        setSelectedFile(null);
    }
    return (
        <div className="relative gap-1 w-full flex justify-center items-center text-gray-500">
            {previewUrl && <img src={previewUrl} alt="Uploaded preview"  className="absolute max-h-36 top-12 right-10 bg-slate-400 p-1 rounded z-10"/>}
            <div className="relative w-full">
                <input 
                    type="text"
                    value={content}
                    onChange={handleChange} 
                    disabled={disabled}
                    className={`
                        ${!!error ? "border-red-400": "border-gray-300"}
                        peer border-[1px]  bg-gray-50  ps-3 py-5 h-10 w-full outline-none hover:hover:bg-opacity-90 pointer rounded-xl align-middle focus:ring-[#6469ff] focus:border-[#6469ff] block`}
                /> 
                <div className="absolute right-1 top-1 flex justify-center items-center gap-2">
                    { image &&<label htmlFor="uploadImage"><CiImageOn size={30}/></label> }
                    <button onClick={handleSubmit} className={`${disabled ? "opacity-50 pointer-events-none" : "opacity-100"}`}><CiPaperplane size={30}/></button> 
                </div>
                <p className={`absolute top-[20%] left-4 text-gray-400 peer-focus:-top-2/3 peer-focus:left-2 peer-focus:font-medium peer-focus:text-gray-800 transition-[500ms]`}>
                    {placeholder}
                </p>   
                {
                    content || previewUrl
                        ? <button onClick={handleClear} className="absolute right-20 top-2">
                            <IoMdClose size={24}/>
                        </button>
                        : null
                }
                <input type="file"  accept="image/*" id="uploadImage" className="hidden" onChange={onFileChange} /> 
            </div>   
        </div> 
    )
}


export default FormImageField;