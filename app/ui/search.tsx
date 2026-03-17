"use client";

import { useState } from "react";

type SearchProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
};

export default function Search({
  placeholder = "Search...",
  onSearch,
}: SearchProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        aria-label="Search"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
