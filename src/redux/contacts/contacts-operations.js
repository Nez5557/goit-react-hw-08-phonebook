import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:4041';

export const postContact = createAsyncThunk('contacts/addContact',
    async ({ name, number }, {rejectWithValue}) => {
        try {
            const contact = {
            name: name,
            number: number,
        };
        const responce = await axios.post('/contacts', contact)
            .then(responce => responce.data);
        return responce
        } catch (error) {
            return rejectWithValue(error)
        };
    });

export const fetchContacts = createAsyncThunk('contacts/getContacts',
    async (_, {rejectWithValue}) => {
        try {
        const responce = await axios.get('/contacts')
            .then(responce => responce.data);
        return responce
        } catch (error) {
            return rejectWithValue(error)
        };
    });

export const deleteContact = createAsyncThunk('contacts/deleteContact',
    async (id, {rejectWithValue}) => {
        try {
            await axios.delete(`/contacts/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error)
        };
    });