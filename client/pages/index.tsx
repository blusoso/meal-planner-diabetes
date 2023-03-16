import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Button, { BUTTON_TYPE } from "../components/Button";
import setAuthToken from "../utils/setAuthToken";
import { useRecoilState } from "recoil";
import { authState } from "../recoils";

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);

  const onLogout = (e: any) => {
    e.preventDefault();

    localStorage.removeItem("jwtToken");
    setAuthToken("");
    setAuth(undefined);
  };

  return (
    <div>
      <Head>
        <title>Meal Planner Diabetes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <Button
          type={BUTTON_TYPE.PRIMARY}
          onClick={() => router.push("/register")}
        >
          <>Register</>
        </Button>
        <Button
          type={BUTTON_TYPE.PRIMARY}
          onClick={() => router.push("/login")}
        >
          <>Login</>
        </Button> */}
        <button onClick={() => router.push("/register")}>Register</button>
        <button onClick={() => router.push("/login")}>Login</button>
        <button onClick={onLogout}>Logout</button>

        <div>{auth && `Hello, ${auth.name}`}</div>
      </main>
    </div>
  );
}