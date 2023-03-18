import { CustomAppProps } from "@/pages/_app";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

type LayoutProps = {
  children: ReactNode;
  protectedPage: boolean;
} & CustomAppProps;

const Layout = ({ auth, children, protectedPage = false }: LayoutProps) => {
  const router = useRouter();

  const fetchAuth = async () => {
    const token = Cookies.get("token");
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/me`, {
        headers: { Authorization: token },
      })
      .catch(() => router.push("/login"));
  };

  useEffect(() => {
    if (protectedPage) {
      fetchAuth();
    }
  }, [router]);

  return <div>{children}</div>;
};

export default Layout;
