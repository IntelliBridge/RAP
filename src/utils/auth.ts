// src/utils/auth.ts
export const isLoggedIn = () => {
  const user = localStorage.getItem('user');
  return !!user; // Returns true if user is not null
};
 