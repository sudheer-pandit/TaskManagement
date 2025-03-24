import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely parse JSON
const getUserFromLocalStorage = () => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: localStorage.getItem("token") ? true : false,
        user: getUserFromLocalStorage(),
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },

        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
