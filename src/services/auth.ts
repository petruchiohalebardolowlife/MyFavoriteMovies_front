export const CREDENTIALS = {
  username: "username",
  password: "password",
};

export const signIn = (username: string, password: string) => {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    const token = "someToken";
    sessionStorage.setItem("authToken", token);
    return { success: true, token };
  }
  return { success: false, error: "Invalid username or password" };
};

