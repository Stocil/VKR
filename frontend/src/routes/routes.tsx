import { ReactElement } from 'react';

import { HomePage } from 'pages/homepage';

type Route = {
  path: string;
  element: ReactElement;
};

export enum routesKeys {
  main = 'main',
}

export enum routesPaths {
  main = '/',
}

export const routes: Record<routesKeys, Route> = {
  main: {
    path: routesPaths.main,
    element: <HomePage />,
  },
};

export const routesValues = Object.values({ ...routes });
