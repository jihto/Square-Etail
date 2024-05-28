import React, { memo, useCallback, useEffect, useState } from "react"  
import FormImageField from "../../inputs/FormImageField";  
import toast from "react-hot-toast"; 
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store"; 
import Box from "../../Box";
import Avatar from "../../Avatar";
import Each from "../../../middlewares/Each";
import Heading from "../../Heading";
import moment from "moment";
import { useDispatch } from "react-redux"; 
import { ThunkDispatch } from "redux-thunk"; 
import { ReviewDto } from "../../../types/Reviews.dto";
import { RootReviewsAction } from "../../../redux/reducers/reviewsReducer";
import { createReviews, getReviews } from "../../../redux/actions/commentAction";
import useAuthenticationModal from "../../../hooks/zustands/useAuthenticationModal";
 
const Review:React.FC<{productId: string}> = ({ productId }) => {  
    const [error, setError] = useState<string | null> (null);
    const { onOpen } = useAuthenticationModal();
    const { user } = useSelector((state: RootState) => state.auth) ;
    const { reviews, isLoading } = useSelector((state: RootState) => state.reviews);  
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootReviewsAction>>(); 
    const handleSendComment = useCallback(async (content: string, imageData?: File | null) => {  
            if(user){
                if(content){
                    try {  
                        const formData = new FormData();
                        formData.append("content", content); 
                        formData.append("userId", user?._id)
                        if(imageData)
                            formData.append("picture", imageData);
                        const newComment: string = await dispatch(createReviews(formData, productId)); 
                        toast.success(newComment); 
                    } catch (error: any) {  
                        toast.error(error.message) 
                    }    
                } else{
                    setError("Need write the Review first") 
                }
            }else{
                onOpen();
            }
    },[] );

    useEffect(() => {  
        dispatch(getReviews(productId, user?.token || ""))
    }, [productId]);
    return (
        <div className="flex flex-col gap-4 h-full"> 
            <hr/>
            <Box className="w-fit bg-secondary text-white rounded-full">Reviews: {reviews.length}</Box>
            <div className="flex flex-col gap-3 h-[650px] max-h-5/6 overflow-x-hidden overflow-auto touch-pan-x p-5 rounded-lg shadow-md border">
                {
                    reviews.length > 0
                        ? <Each
                            of={reviews}
                            render={(item:ReviewDto) =>  
                                <Heading 
                                    title={
                                        <div className="w-full flex gap-3 items-start">
                                            <Avatar size={8} imgUrl={item.user_create.avatar}/>
                                            <div className="flex-between w-full"> 
                                                <p>{item.user_create.name}</p> 
                                                <p className="text-sm text-gray-500">{moment(item.timeStamp).format("kk:mm:ss YYYY/MM/DD")}</p> 
                                            </div>
                                        </div>
                                    }
                                    className='bg-white p-2 rounded-md grid gap-3 w-[95%]'
                                > 
                                    <p className="max-w-full break-words">{item.content}</p> 
                                    { item.picture ? <img className="w-1/2 rounded" src={item.picture} /> : null}
                                    <hr/>
                                </Heading> 
                            }
                        /> 
                        : <p className="text-center text-lg text-gray-500 content-center">Hasn't Review</p>
                }
            </div>
            <div className="flex-start gap-3 mt-3">
                <Avatar/>
                <FormImageField
                    placeholder='Review....'
                    disabled = {isLoading ? true : false} 
                    onSubmit={handleSendComment}
                    error={error}
                />    
            </div>
        </div>
    )
}

export default memo(Review);