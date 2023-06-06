import { useSearchParams, Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authStateAtom, fetchBungieAccessTokenAtom } from "../atoms/auth";
import Box from "../components/Box/Box";
import { useEffect, useState } from "react";

export const OAuth = () => {
  const [authenticating, setAuthenticating] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const [authState] = useAtom(authStateAtom);
  const [, fetchAccessToken] = useAtom(fetchBungieAccessTokenAtom);

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    if (!code || !state || state !== authState) {
      setAuthenticating(false);
      return;
    }

    if (state === authState && !!code) {
      fetchAccessToken({ code }).then(() => {
        setAuthenticating(false);
      });
    }
  }, []);

  if (authenticating) {
    return <div>Authenticating</div>;
  }

  if (authState !== state) {
    return (
      <Box>
        <h2 className="text-2xl font-bold leading-9 tracking-tight">Error</h2>
        <p className="text-base text-gray-900">
          The state does not match. Please try again.
        </p>
      </Box>
    );
  }

  return <Navigate to="/inventory-optimizer" replace />;
};

export default OAuth;
