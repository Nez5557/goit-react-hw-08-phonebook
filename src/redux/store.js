import { configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { contacts } from './contacts/contacts-reducers';
// import { userSlice } from 'redux/user/user-slice';
import authorizationSlice from "redux/authorization/authorization-slice";

// const store = configureStore({
//     reducer: { phonebook: contacts, authorization: authorizationSlice},
//     middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
//     devTools: process.env.NODE_ENV !== 'production',
// });

// export { store };





const persistConfig = {
    key: 'authrorization',
    storage,
    whitelist: ['token'],
};


// const mainReducer = combineReducers({
//     contacts: contactsReducer,
//     filter: filterReducer,
//     loader: loaderReducer
// });

// const persistedReducer = persistReducer(persistConfig, mainReducer);

// const authPersistReducer = persistReducer(persistConfig, authorizationSlice.reducer);

const store = configureStore({
    reducer: {
        phonebook: contacts,
        authorization: persistReducer(persistConfig, authorizationSlice)
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(
        { serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }
    ), logger],
    devTools: process.env.NODE_ENV !== 'production',
});


const persistor = persistStore(store);

export  { store, persistor };


