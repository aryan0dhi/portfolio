import { Nav } from './components/Nav/Nav';
import { Hero } from './components/Hero/Hero';
import { Vaila } from './components/Vaila/Vaila';
import { Garmin } from './components/Garmin/Garmin';
import { KvStore } from './components/KvStore/KvStore';
import { Forecasting } from './components/Forecasting/Forecasting';
import { Supporting } from './components/Supporting/Supporting';
import { Capabilities } from './components/Capabilities/Capabilities';
import { Contact } from './components/Contact/Contact';
import { Analytics } from '@vercel/analytics/react';
import { useReveal } from './hooks/useReveal';

export function App() {
  useReveal();

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Vaila />
        <Garmin />
        <KvStore />
        <Forecasting />
        <Supporting />
        <Capabilities />
      </main>
      <Contact />
      <Analytics />
    </>
  );
}
