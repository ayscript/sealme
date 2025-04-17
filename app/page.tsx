// import Image from "next/image";
import Button from "@/components/Button";
// import Input from "@/components/Input";
// import Chat from "@/components/Chat";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <section className="body">
      <Header />
      <h1 className="bigText text-center my-6">Seal Me</h1>
      <Hero />
      <section className="p-8 text-center">
        <p className="text-[14px] mb-4">Create a chat room to get started!</p>
        <Link href="/chat">
          <div className="mx-auto inline-block">
            <Button>Create Chat</Button>
          </div>
        </Link>
      </section>
      <section className="p-8  max-w-[980px] mx-auto" id="about">
        <h1 className="mb-4 text-center text-2xl font-bold">About</h1>
        <h2 className="mb-4 text-12 font-bold">Meet the Developer</h2>
        <p>
          This project is built by{" "}
          <span className="text-primary font-bold">Ayomide Olaleye</span>, a 400
          Level Computer Science student of the Federal University of
          Agriculture, Abeokuta (FUNAAB). Ayomide is passionate about building
          scalable web applications and solving real-world problems through
          technology. You can connect with Ayomide on{" "}
          <a
            href="https://github.com/ayomideolaleye"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            GitHub
          </a>{" "}
          or{" "}
          <a
            href="https://www.linkedin.com/in/ayomideolaleye"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            LinkedIn
          </a>.
        </p>
      </section>
    </section>
  );
}
