import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === 'loading' && <p style={{ color: 'green', position: 'fixed', top: '50%', right: '50%' }}>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
