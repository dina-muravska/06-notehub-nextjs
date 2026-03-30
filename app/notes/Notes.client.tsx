"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const [page] = useState(1);
  const [search] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No data</p>;

  return <NoteList notes={data.notes} />;
}
