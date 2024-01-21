'use client';
import About from "./camera/page";
export default function Home() {

  if(typeof window !== 'undefined'){
    if(window.innerWidth <= 768){
      return (
        <>
        <h2>Sentience Dial Storyboard</h2>
        <About/>
        </>
      );
    }
  }
  else{
    return (
      <>
      <h2>Pls use mobile</h2>
      </>
    );
  }
  
}
