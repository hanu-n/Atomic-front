// Authentication utility functions
export const isUserVerified = (user) => {
  return user && user.emailVerified;
};

export const isUserAuthenticated = (user) => {
  return user !== null;
};

export const getUserEmail = (user) => {
  return user ? user.email : null;
};

export const getUserId = (user) => {
  return user ? user.uid : null;
};
