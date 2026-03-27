import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const { page = 1, search = "", perPage = 12 } = params;

  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search },
  });

  return response.data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}
export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
};
