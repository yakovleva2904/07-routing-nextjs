'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', searchQuery, page, tag],

    queryFn: () => fetchNotes(searchQuery, page, tag),

    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error loading notes.</p>;
  }

  return (
    <>
      <SearchBox searchQuery={searchQuery} onChange={setSearchQuery} />

      <NoteList notes={data.notes} />

      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
    </>
  );
}