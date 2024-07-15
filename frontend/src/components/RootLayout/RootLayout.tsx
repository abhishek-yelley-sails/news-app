import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}