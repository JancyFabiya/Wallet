import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import axios from '../../utils/axios';




//.............User Registration------------


export const userLoginAction = createAsyncThunk(
    "/register",
    async (user, { rejectWithValue, getState, dispatch }) => {
        console.log("user", user)
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/register",
                user,
                config
            );

            console.log('db data', data);
            if (data && data.user) {
                localStorage.setItem("users", JSON.stringify(data.user))
            }
            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)




//.............User OTP Login------------


export const userOTPAction = createAsyncThunk(
    "/login",
    async (otp, { rejectWithValue, getState, dispatch }) => {
        console.log("user", otp)
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/login",
                otp,
                config
            );

            console.log('db data', data);
            if (data) {
                localStorage.setItem("login", JSON.stringify(data))

            }
            return data;

        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)


//.............User wallet credit------------


export const walletCreditAction = createAsyncThunk(
    "/credit",
    async (amount, { rejectWithValue, getState, dispatch }) => {
        console.log("amount", amount)
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.put(
                "/credit",
                amount,
                config
            );

            console.log('db wallet data', data);

            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)


//.............All users------------


export const getAllUsersAction = createAsyncThunk(
    "/allUsers",
    async ( { rejectWithValue, getState, dispatch }) => {
        
        try {
           
            const { data } = await axios.get(
                "/allUsers"
            );

            console.log('db wallet data', data);

            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)



//--------Slices--------------

const userSlices = createSlice({
    name: "users",
    initialState: {
        userAuth: 'register',
    },

    extraReducers: (builder) => {
        //register
        builder.addCase(userLoginAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverError = undefined;
        });
        builder.addCase(userLoginAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverError = undefined;
        });
        builder.addCase(userLoginAction.rejected, (state, action) => {
            console.log("action.payload", action.payload)
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //login
        builder.addCase(userOTPAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverError = undefined;
        });
        builder.addCase(userOTPAction.fulfilled, (state, action) => {
            state.loading = false;
            state.login = action?.payload;
            state.appErr = undefined;
            state.serverError = undefined;
        });
        builder.addCase(userOTPAction.rejected, (state, action) => {
            console.log("action.payload", action.payload)
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverError = action?.error?.message;
        });



        //wallet credit
        builder.addCase(walletCreditAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverError = undefined;
        });
        builder.addCase(walletCreditAction.fulfilled, (state, action) => {
            state.loading = false;
            state.credit = action?.payload;
            state.appErr = undefined;
            state.serverError = undefined;
        });
        builder.addCase(walletCreditAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverError = action?.error?.message;
        });


            //AllUsers
            builder.addCase(getAllUsersAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverError = undefined;
            });
            builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action?.payload;
                state.appErr = undefined;
                state.serverError = undefined;
            });
            builder.addCase(getAllUsersAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverError = action?.error?.message;
            });

    }
})




export default userSlices.reducer;