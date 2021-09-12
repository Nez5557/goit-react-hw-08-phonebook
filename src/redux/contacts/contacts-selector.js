import { createSelector } from "reselect";

export const getContacts = (state) => state.phonebook.contacts;
export const getFilter = (state) => state.phonebook.filter;
export const getLoader = (state) => state.phonebook.loader;

export const getFilteredContacts = createSelector(
    [getFilter, getContacts],
    (filterValue, contacts) => {
        return contacts.filter((item) =>
            item.name.toLowerCase().includes(filterValue.toLowerCase()));
    }
);