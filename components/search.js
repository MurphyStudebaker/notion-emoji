"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/command";

// export interface SearchProps {
//   searchPokedex: (
//     content: string
//   ) => Promise<
//     Array<Pick<SelectEmoji, "id" | "emoji"> & { similarity: number }>
//   >;
//   setEmoji: (content: string) => void;
// }

export function Search({ query, setQuery, searchResults, handleKeyPress }) {
  return (
    <div className="w-full">
      <Command label="Command Menu" shouldFilter={false}>
        <CommandInput
          id="search"
          placeholder="New Page"
          className="focus:ring-0 focus:border-0 border-0 active:ring-0 active:border-0 ring-0 outline-0 text-7xl font-bold leading-tight tracking-tight"
          value={query}
          onValueChange={(q) => setQuery(q)}
          onKeyDown={handleKeyPress}
        />
        <CommandList>
          <CommandEmpty></CommandEmpty>
          {searchResults.map((result) => (
            <CommandItem
              key={result.id}
              value={result.emoji}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-800">{result.emoji}</p>
                </div>
              </div>
              <div className="text-sm text-gray-800">
                {result.similarity ? (
                  <div className="text-xs font-mono p-0.5 rounded bg-zinc-100">
                    {result.similarity.toFixed(3)}
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
