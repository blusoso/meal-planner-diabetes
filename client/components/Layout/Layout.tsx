import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { CustomAppProps } from "@/pages/_app";

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
