import { FC } from 'react';

import { BrowserRouter } from 'react-router';

import { RoutesList } from './routes-list';

export const Router: FC = () => (
  <BrowserRouter>
    <RoutesList />
  </BrowserRouter>
);
