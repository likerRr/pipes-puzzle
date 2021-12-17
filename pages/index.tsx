import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Game = dynamic(() => import('../src/components/Game'), { ssr: false });

const Home: NextPage = () => <Game />;

export default Home;
