import "../styles/globals.css";
import axios from "axios";
import App, { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { MeData } from "../services/auth/me";
import { COOKIE_NAME } from "../utils/cookies";

export type CustomAppProps = { auth?: MeData };

const CustomApp = ({
  Component,
  pageProps,
  auth,
}: AppProps & CustomAppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} auth={auth} />
    </RecoilRoot>
  );
};

CustomApp.getInitialProps = async (appContext: any) => {
  const { req } = appContext.ctx;
  const token = req?.cookies[COOKIE_NAME.TOKEN];
  let auth: MeData | null = null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/me`,
      { headers: { Authorization: token } }
    );

    auth = res.data;
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps, auth };
  } catch (err) {
    console.error(err);
    return { auth: null };
  }
};

export default CustomApp;
