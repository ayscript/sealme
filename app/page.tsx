import Image from "next/image";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Chat from "@/components/Chat";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featurecard from "@/components/Featurecard";

export default function Home() {
  return (
    <div className="body">
      {/* <Input /> */}
      {/* <Chat></Chat> */}
      <Header />
      <h1 className="bigText text-center my-6">Seal Me</h1>
      <Hero />
      <div className="grid grid-cols-2 mx-auto place-items-center p-4 sm:flex sm:items-center gap-8 justify-center my-10 sm:flex-wrap">
        <Featurecard>Chat Anonymously</Featurecard>
        <Featurecard>Speak Your Mind</Featurecard>
        <Featurecard>Have Fun</Featurecard>
        <Featurecard>Shoot Your Shot</Featurecard>
      </div>
    </div>
  );
}
