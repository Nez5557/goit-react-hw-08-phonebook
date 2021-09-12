import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { changeFilter } from './contacts-actions';

import { postContact, fetchContacts, deleteContact } from './contacts-operations';

const contactsReducer = createReducer([], {
    [postContact.fulfilled]: (state, { payload }) =>  [...state, payload],
    [fetchContacts.fulfilled]: (_, { payload }) => [...payload],

    [deleteContact.fulfilled]: (state, { payload }) => {
        const newContacts = state.filter((item) => item.id !== payload);
        console.log(newContacts, 'new contacts')
        return newContacts;
    },
});

const filterReducer = createReducer('', {
    [changeFilter]: (_, action) => action.payload
});

const loaderReducer = createReducer(false, {
    [postContact.pending]: () => true,
    [postContact.fulfilled]: () => false,
    [postContact.rejected]: () => false,

    [fetchContacts.pending]: () => true,
    [fetchContacts.fulfilled]: () => false,
    [fetchContacts.rejected]: () => false,

    [deleteContact.pending]: () => true,
    [deleteContact.fulfilled]: () => false,
    [deleteContact.rejected]: () => false,
    
});

const errorReducer = createReducer(null, {
    [postContact.rejected]: (_, { payload }) => payload,
    [fetchContacts.rejected]: (_, { payload }) => payload,
    [deleteContact.rejected]: (_, { payload }) => payload,
    [postContact.pending]: null,
    [fetchContacts.pending]: null,
    [deleteContact.pending]: null
})

export const contacts = combineReducers({
    contacts: contactsReducer,
    filter: filterReducer,
    loader: loaderReducer,
    error: errorReducer,
})
