import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { SiteContextProvider } from '../context/context';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SiteContextProvider>
        <Component {...pageProps} />
      </SiteContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
