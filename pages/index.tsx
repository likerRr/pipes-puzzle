import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const PipesPuzzle = dynamic(() => import('../src/components/PipesPuzzle'), { ssr: false });

const Home: NextPage = () => <PipesPuzzle />;

export default Home;
