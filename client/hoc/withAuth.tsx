import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const RequireAuth = (props: any) => {
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
      fetchAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return RequireAuth;
};

export default withAuth;
