import { CustomAppProps } from "@/pages/_app";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

type LayoutProps = {
  children: ReactNode;
  protectedPage: boolean;
} & CustomAppProps;

const Layout = ({ auth, children, protectedPage = false }: LayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    if (protectedPage && !auth) {
      router.push("/login");
    }
  }, [auth]);

  return <div>{children}</div>;
};

export default Layout;
