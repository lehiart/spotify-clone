import Head from 'next/head';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div className="">
      <main className="h-screen bg-black">
        <Sidebar />
        {/* {Center} */}
      </main>
    </div>
  );
};

export default Home;
