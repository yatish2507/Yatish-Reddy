// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// // import { CourseOffering } from "../models/Course";
// import { AppState } from ".";


// export type CourseOfferingsState = CourseOffering[];
// const initiateState: CourseOfferingsState = [];
// export const courseOfferingsSlice = createSlice({
//     name: 'courseOfferings',
//     initialState: initiateState,
//     reducers: {
//         loadCourseOfferings: (state: CourseOfferingsState, action: PayloadAction<CourseOfferingsState>) => {
//             return [...action.payload];
//         }
//     }
// });


// // Actions
// export const { loadCourseOfferings } = courseOfferingsSlice.actions;

// // Selectors
// export const getAll = (): ((state: AppState) => CourseOfferingsState) => {
//     return (state: AppState) => { return state.courseOfferings };
// }

// export const findById = (id: string | undefined): ((state: AppState) => CourseOffering | undefined) => {
//     return (state: AppState) => state.courseOfferings.find(co => co.id === id);
// }

// // Reducers
// export default courseOfferingsSlice.reducer;