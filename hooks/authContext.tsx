import { getUser, registerUser } from "@/utils/databases";
import Storage from "expo-sqlite/kv-store";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
const ini: string | null = null;
const AuthCtx = createContext({
  user: ini,
  signUp: (
    fullname: string,
    username: string,
    password: string,
    profile: string
  ) => {},
  login: (
    username: string,
    password: string
  ): Promise<{
    success: boolean;
    msg: string;
  }> => {
    return new Promise((rs, rj) => rs({ success: true, msg: "" }));
  },
  logout: () => {},
});
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const inival: string | null = null;
  const [userData, setUserData] = useState(inival) as any;
  async function signUp(
    fullname: string,
    username: string,
    password: string,
    profile: string
  ) {
    await registerUser(username, fullname, password, profile);
    await Storage.setItem(
      "noteAppUser",
      JSON.stringify({ username, fullname, password, profile })
    );
    setUserData(JSON.stringify({ username, fullname, password, profile }));
  }
  async function login(username: string, password: string) {
    const { status, msg, data } = await getUser(username);

    if (status === "error") return { success: false, msg };
    else if (!data) {
      return { success: false, msg: "User not found ..." };
    } else if (data["PASSWORD"] === password) {
      await Storage.setItem("noteAppUser", JSON.stringify({ ...data }));
      setUserData(JSON.stringify({ ...data }));
      return { success: true, msg: "" };
    } else return { success: false, msg: "Username name or password error!" };
  }
  async function logout() {
    console.log("Logout");
    await Storage.removeItemAsync("noteAppUser");
    setUserData(null);
  }
  useEffect(() => {
    async function getUser() {
      const user = await Storage.getItem("noteAppUser");
      if (user) {
        setUserData(user);
      }
    }
    getUser();
  }, [userData]);
  return (
    <AuthCtx.Provider
      value={{
        user: userData,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
};
export default AuthProvider;
export const useAuth = () => useContext(AuthCtx);
