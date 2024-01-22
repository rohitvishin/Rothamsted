'use client';
// pages/index.js
import VideoPlayer from "./video/page.tsx";

const Home = () => {
  const videoSrc = '/video/road.mp4';

  return (
    <div>
      <h1>Welcome to My Website</h1>
      <VideoPlayer videoSrc={videoSrc} />
    </div>
  );
};

export default Home;

