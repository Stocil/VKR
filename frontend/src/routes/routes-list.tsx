import { Route, Routes } from 'react-router';

import { Layout } from 'pages/layout';

import { routesValues } from './routes';

export const RoutesList = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {routesValues.map(({ element, path }) => {
          return <Route key={path} path={path} element={element} />;
        })}
      </Route>
    </Routes>
  );
};
