interface RouteDefinition {
  [key: string]: {
    path: string;
  };
}

export const routes: RouteDefinition = {
  home: {
    path: "/home",
  },
  login: {
    path: "/",
  },
};
