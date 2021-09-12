export const getUser = (state) => state.authorization.user;
export const getToken = (state) => state.authorization.token;
export const getLoggedIn = (state) => state.authorization.isLoggedIn;
export const getRefreshLoader = (state) => state.authorization.refreshLoader;