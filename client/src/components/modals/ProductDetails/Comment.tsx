import React, { memo, useEffect, useState } from "react"  
import FormImageField from "../../inputs/FormImageField";
import { CommentDto } from "../../../types/Comment.dto";  
import toast from "react-hot-toast";
import { createComment, fetchComments } from "../../../redux/api/djangoAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store"; 
import Box from "../../Box";
 
const Comment:React.FC<{productId: string}> = ({ productId }) => {
    const [comments, setComments] = useState<CommentDto[] | []>([]);
    const [sending, setSending] = useState<boolean>(false);  
    const [error, setError] = useState<string | null> (null);
    const { user } = useSelector((state: RootState) => state.auth) 
    const handleSendComment = async (content: string, imageData?: File | null) => {
        try { 
            if(content){
                setSending(true); 
                const formData = new FormData();
                formData.append("content", content); 
                formData.append("productId", productId)
                if(imageData)
                    formData.append("picture", imageData);
                const newComment = await createComment(formData); 
                toast.success(newComment) 
                setSending(false);  
                getComments()
            } else{
                setError("Need write the comment first") 
            }
        } catch (error) {
            console.error(error);
            setSending(false);
        }    
    }

    console.log(comments);
    const getComments = async () => {
        try { 
            const response = await fetchComments(productId, user?.token ?? "");
            setComments(response ? response : []);  
        } catch (error: any) {
            toast.error(error?.message)
        }
    } 
    useEffect(() => {  
        getComments();
    }, []);
    return (
        <div className="flex flex-col gap-6 h-full"> 
            <hr/>
            <FormImageField
                placeholder='Comment....'
                disabled = {sending ? true : false} 
                onSubmit={handleSendComment}
                error={error}
            />   
            <Box>Comments: {comments.length}</Box>
            <div className="grid gap-5 h-[650px] max-h-5/6 overflow-x-hidden overflow-auto touch-pan-x p-5 rounded-lg">
                {/* {
                    comments.length > 0
                        ? <Each
                            of={comments}
                            render={(item:CommentDto) =>  
                                <Heading 
                                    title={
                                        <><img src="public/th.jpg" className="w-10 h-10  rounded-full"/> <p>{item.user_create.name}</p></>
                                    }
                                    className='bg-white p-2 rounded-md grid gap-3 w-[95%]'
                                > 
                                    { item.picture ? <img className="w-1/3 max-w-1/2 rounded" src={`${item.picture}`} /> : null}
                                    <p className="max-w-full break-words">{item.content}</p>
                                    <p className="text-sm text-gray-500">{moment(item.timeStamp).format("kk:mm:ss YYYY/MM/DD")}</p>
                                    <hr/>
                                </Heading> 
                            }
                        /> 
                        : <p className="text-center text-lg text-gray-500 content-center">Hasn't comment</p>
                } */}
            </div>
        </div>
    )
}

export default memo(Comment);