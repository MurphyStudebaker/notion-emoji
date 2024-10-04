"use client";
import { searchEmojis, chooseRandomEmoji } from "@/app/actions";
import { db } from "@/drizzle/db";
import { SelectEmoji, emojis } from "@/drizzle/schema";
import { Search } from "@/components/search";
import Toolbar from "@/components/toolbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const [emoji, setEmoji] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<Pick<SelectEmoji, "id" | "emoji"> & { similarity?: number }>
  >([]);
  const [debouncedQuery] = useDebounce(query, 150);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    if (query == "") {
      chooseRandomEmoji().then((selection) => {
        setEmoji(selection.emoji);
        setLoading(false);
      });
    } else {
      searchEmojis(debouncedQuery).then((results) => {
        setSearchResults(results);
        setLoading(false);
        setEmoji(results[0].emoji);
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  useEffect(() => {
    if (query == "") {
      setSearchResults([]);
      setEmoji("");
    }
  }, [query]);

  return (
    <main className="relative flex min-h-screen flex-col items-start justify-start py-16 px-32">
      {loading ? <LoadingSpinner /> : <div className="text-7xl">{emoji}</div>}
      <Toolbar handleButtonClick={handleButtonClick} />
      <Search
        query={query}
        searchResults={searchResults}
        setQuery={setQuery}
        handleKeyPress={handleKeyPress}
      />
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
