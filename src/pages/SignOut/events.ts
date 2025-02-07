export const handleSignOut = async (onSuccess: any, onError: any) => {
  try {
    localStorage.removeItem('user'); // Adjust this key according to your actual key

    onSuccess();
    
  } catch (error) {
    console.log("Error signing out: ", error);
    onError(`Error signing out: ${error}`);
  }
};
