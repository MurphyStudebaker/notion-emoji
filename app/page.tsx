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
      <Link
        href="https://github.com/vercel/examples/tree/main/storage/postgres-pgvector"
        className="lg:absolute bottom-12 right-12 flex items-center space-x-2"
      >
        <Image
          src="/github.svg"
          alt="GitHub Logo"
          width={24}
          height={24}
          priority
        />
        <span className="font-light">Source</span>
      </Link>
    </main>
  );
}
