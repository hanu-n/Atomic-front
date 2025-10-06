export const getToken = async (currentUser) => {
  if (!currentUser) throw new Error("No user logged in");
  const token = await currentUser.getIdToken();
  return token;
};
