"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/command";
import { SelectEmoji } from "@/drizzle/schema";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// export interface SearchProps {
//   searchPokedex: (
//     content: string
//   ) => Promise<
//     Array<Pick<SelectEmoji, "id" | "emoji"> & { similarity: number }>
//   >;
// }

export function Search({ searchPokedex, setEmoji }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<Pick<SelectEmoji, "id" | "emoji"> & { similarity?: number }>
  >([]);
  const [debouncedQuery] = useDebounce(query, 150);
  useEffect(() => {
    let current = true;
    if (debouncedQuery.trim().length > 0) {
      searchPokedex(debouncedQuery).then((results) => {
        if (current) {
          setSearchResults(results);
          setEmoji(results[0].emoji);
        }
      });
    }
    return () => {
      current = false;
    };
  }, [debouncedQuery, searchPokedex]);

  return (
    <div className="w-full">
      <Command label="Command Menu" shouldFilter={false}>
        <CommandInput
          id="search"
          placeholder="New Page"
          className="focus:ring-0 focus:border-0 border-0 active:ring-0 active:border-0 ring-0 outline-0 text-7xl font-bold leading-tight tracking-tight"
          value={query}
          onValueChange={(q) => setQuery(q)}
        />
        <CommandList>
          <CommandEmpty></CommandEmpty>
          {searchResults.map((pokemon) => (
            <CommandItem
              key={pokemon.id}
              value={pokemon.emoji}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-800">{pokemon.emoji}</p>
                </div>
              </div>
              <div className="text-sm text-gray-800">
                {pokemon.similarity ? (
                  <div className="text-xs font-mono p-0.5 rounded bg-zinc-100">
                    {pokemon.similarity.toFixed(3)}
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
}

Search.displayName = "Search";
