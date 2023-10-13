import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload, thunkApi) => {
        try {
            const res = await axios.post(`${BASE_URL}/users`, payload);
            return res.data
        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(err)
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (payload, thunkApi) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, payload);
            localStorage.setItem('jwt', res.data.access_token)
        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(err)
        }
    }
);

export const checkAuth = createAsyncThunk(
    'users/checkAuth',
    async (_, thunkApi) => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) return;
            const login = await axios(`${BASE_URL}/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            })
            return login.data
        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload, thunkApi) => {
        try {
            const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
            return res.data
        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(err)
        }
    }
);

const addCurrentUser = (state, { payload }) => {
    state.currentUser = payload;
    state.isLoading = false;
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        cart: [],
        favourite: [],
        isLoading: false,
        formType: 'signup',
        showForm: false
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.favourite = [];
            state.cart = [];
            state.jwt = null;
        },
        addItemToCart: (state, { payload }) => {
            let newCart = [...state.cart];
            const found = state.cart.find(({ id }) => id === payload.id);
            if (found) {
                newCart = newCart.map((item) => {
                    return item.id === payload.id
                        ? { ...item, quantity: payload.quantity || item.quantity + 1 }
                        : item
                })
            } else newCart.push({ ...payload, quantity: 1 })
            state.cart = newCart;
        },
        addItemtoFavourite: (state, { payload }) => {
            let newFav = [...state.favourite]
            const found = state.favourite.find(({ id }) => id === payload.id);
            if (found) {
                newFav = newFav.map((item) => {
                    return item.id === payload.id
                        ? { ...item, favourite: item }
                        : item
                })
            } else newFav.push({ ...payload })
            state.favourite = newFav
        },
        removeItemFromFavourite: (state, { payload }) => {
            state.favourite = state.favourite.filter(({ id }) => id !== payload)
        },
        removeItemFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(({ id }) => id !== payload)
        },
        toggleForm: (state, { payload }) => {
            state.showForm = payload
        },
        toggleFormType: (state, { payload }) => {
            state.formType = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, addCurrentUser);

        builder.addCase(checkAuth.pending, (state) => {
            state.isLoading = true
        }
        )
        builder.addCase(checkAuth.fulfilled, addCurrentUser);
        // builder.addCase(loginUser.fulfilled, addCurrentUser);
        builder.addCase(updateUser.fulfilled, addCurrentUser);
    }
});

export const { addItemToCart, addItemtoFavourite, removeItemFromFavourite, removeItemFromCart, toggleForm, toggleFormType, logout } = userSlice.actions;
export default userSlice.reducer;