import Storage from "expo-sqlite/kv-store";
import { getUser, registerUser } from "@/utils/databases";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
const AuthContext = createContext({
  user: "",
  register: (
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
export default ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState("");
  async function register(
    fullname: string,
    username: string,
    password: string,
    profile: string
  ) {
    await registerUser(username, fullname, password, profile);
    const u = JSON.stringify({ username, fullname, password, profile });
    await Storage.setItem("noteAppUser", u);
    setUser(u);
  }
  async function login(username: string, password: string) {
    const { status, msg, data } = (await getUser(username)) as {
      status: string;
      msg: string;
      data: { PASSWORD: string };
    };
    if (status === "error") return { success: false, msg };
    else if (!data) {
      return { success: false, msg: "User not found ..." };
    } else if (data["PASSWORD"] === password) {
      await Storage.setItem("noteAppUser", JSON.stringify({ ...data }));
      setUser(JSON.stringify({ ...data }));
      return { success: true, msg: "" };
    } else return { success: false, msg: "Username name or password error!" };
  }
  async function logout() {
    await Storage.removeItemAsync("noteAppUser");
    setUser("");
  }
  useEffect(() => {
    async function getUserFromSession() {
      const resualt = await Storage.getItemAsync("noteAppUser");
      if (resualt && resualt !== "") {
        setUser(resualt);
      }
    }
    getUserFromSession();
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
