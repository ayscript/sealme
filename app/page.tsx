// import Image from "next/image";
// import Button from "@/components/Button";
// import Input from "@/components/Input";
// import Chat from "@/components/Chat";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featurecard from "@/components/Featurecard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="body">
      <Header />
      <h1 className="bigText text-center my-6">Seal Me</h1>
      <Hero />
      <div className="grid grid-cols-2 mx-auto place-items-center p-4 sm:flex sm:items-center gap-8 justify-center my-10 sm:flex-wrap">
        <Featurecard>
          <Image
          src={'/cartoon.webp'}
          width={200}
          height={200}
          alt='img'
          className='bg-background rounded-lg'
          />
          <h2>Chat Anonymously</h2>
        </Featurecard>
        <Featurecard>
            <Image
              src={'/speakyourmind.webp'}
              width={200}
              height={200}
              alt='img'
              className='bg-background rounded-lg'
            />
          <h2>Speak Your Mind</h2>
        </Featurecard>
        <Featurecard>
          <Image
            src={'/Fun.jpg'}
            width={200}
            height={200}
            alt='img'
            className='bg-background rounded-lg'
            />
          <h2>Have Fun</h2>
        </Featurecard>
        <Featurecard>
          <Image
            src={'/arrow.png'}
            width={200}
            height={200}
            alt='img'
            className='bg-background rounded-lg'
            />
            <h2>Shoot Your Shot</h2>
        </Featurecard>
      </div>
    </div>
  );
}
