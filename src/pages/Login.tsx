import { useAtom } from "jotai";
import { SparklesIcon } from "@heroicons/react/20/solid";
import { Button } from "../components/Button/Button";
import { authStateAtom } from "../atoms/auth";

import { Box } from "../components/Box/Box";
import { useEffect } from "react";

export const Login = () => {
  const [authState, setAuthState] = useAtom(authStateAtom);

  const bungieOauthUrl =
    "https://www.bungie.net/en/OAuth/Authorize" +
    `?client_id=${
      import.meta.env.VITE_BUNGIE_CLIENT_ID
    }&response_type=code&state=${authState}`;

  useEffect(() => {
    setAuthState(authState);
  }, []);

  return (
    <Box>
      <h2 className="text-2xl font-bold leading-9 tracking-tight">
        Please give us the permission
      </h2>
      <p className="text-base text-gray-900">
        In order for the app to work. We need your OAuth token from Bungie in
        order to perform these following actions:
      </p>
      <ul>
        <li className="flex flex-row gap-2 items-center">
          <SparklesIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" />{" "}
          Access items in your inventory and vault
        </li>
      </ul>

      <a rel="noopener noreferrer" href={bungieOauthUrl}>
        <Button>Login</Button>
      </a>
    </Box>
  );
};

export default Login;
