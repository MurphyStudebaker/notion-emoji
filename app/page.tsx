"use client";
import { searchPokedex } from "@/app/actions";
import { Search } from "@/components/search";
import Toolbar from "@/components/toolbar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [emoji, setEmoji] = useState("");
  return (
    <main className="relative flex min-h-screen flex-col items-start justify-start py-16 px-32">
      <div className="text-7xl">{emoji}</div>
      <Toolbar />
      <Search searchPokedex={searchPokedex} setEmoji={setEmoji} />
      <footer className="flex flex-row justify-end gap-4 lg:absolute bottom-4 right-4">
        <p>
          {" "}
          built by{" "}
          <Link
            href="https://www.linkedin.com/in/murphystude/"
            className="font-medium"
          >
            Murphy
          </Link>{" "}
          for{" "}
          <Link href="https://www.notion.so/product" className="font-medium">
            Notion
          </Link>{" "}
        </p>
        <Link
          href="https://github.com/MurphyStudebaker/notion-emoji"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
        </Link>
      </footer>
    </main>
  );
}
