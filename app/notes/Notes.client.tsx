"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

export default function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return null;

  return (
    <>
      <SearchBox value={search} onSearch={setSearch} />

      <NoteList notes={data.notes} />

      <Pagination
        totalPages={data.totalPages}
        currentPage={page}
        onPageChange={(selected) => setPage(selected)}
      />
    </>
  );
}
