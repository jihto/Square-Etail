import { createSlice, PayloadAction } from "@reduxjs/toolkit";    
import { ReviewDto } from "../../types/Reviews.dto";


interface ReviewsState{
    reviews: ReviewDto[]; 
    isLoading: boolean;
    error: null | string;
}


const initialState: ReviewsState = {
    reviews: [],
    isLoading: false,
    error: null,
};

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {  
        storeReviews(state: ReviewsState, action: PayloadAction<ReviewDto[]>){
            state.reviews=action.payload;
            state.isLoading = false;
        },
        addReviews(state: ReviewsState, action: PayloadAction<ReviewDto>){
            state.reviews= [...state.reviews, action.payload];
            state.isLoading = false;
        },
        reviewLoadings(state: ReviewsState) {
            state.isLoading = true;
        },
        reviewsError(state, action: PayloadAction<string|null>) {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export default reviewsSlice.reducer;

export const { storeReviews, addReviews, reviewsError, reviewLoadings } = reviewsSlice.actions;  
export type RootReviewsAction = 
    | typeof storeReviews
    | typeof reviewsError
    | typeof addReviews
    | typeof reviewLoadings 
