"use client";

import Link from "next/link";
import { useState } from "react";

type Topic = {
  id: string;
  name: string;
  slug: string;
  level: string;
};

export default function TopicSearch() {
  const [query, setQuery] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    setNeedsAuth(false);
    try {
      const res = await fetch(`/api/demo-topics?q=${encodeURIComponent(query)}`);
      if (res.status === 401) {
        setNeedsAuth(true);
        setTopics([]);
        return;
      }
      const data = await res.json();
      setTopics(data.topics ?? []);
    } catch {
      setTopics([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="topic-search">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics..."
          className="search-input"
          aria-label="Search topics"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Loading…" : "Search"}
        </button>
      </form>
      {needsAuth && (
        <p className="topic-search-hint">
          <Link href="/login">Sign in</Link> to search topics.
        </p>
      )}
      {searched && !needsAuth && (
        <div className="topic-search-results">
          {loading ? (
            <p className="topic-search-hint">Fetching…</p>
          ) : topics.length > 0 ? (
            <ul className="cart-list">
              {topics.map((t) => (
                <li key={t.id} className="cart-item">
                  <span className="cart-item-name">{t.name}</span>
                  <span className={`badge course-card-difficulty--${t.level}`}>
                    {t.level}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="topic-search-hint">No topics found. Try &quot;server&quot; or &quot;router&quot;.</p>
          )}
        </div>
      )}
      <p className="cart-hint">
        Client Component. Fetches from <code>/api/demo-topics</code> on search.
      </p>
    </div>
  );
}
