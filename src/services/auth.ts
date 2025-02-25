export const CREDENTIALS = {
  username: "username",
  password: "password",
};

export const signIn = (username: string, password: string) => {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    sessionStorage.setItem("authToken", "someToken");
    return { success: true };
  }
  return { success: false, error: `Invalid username or password` };
};
