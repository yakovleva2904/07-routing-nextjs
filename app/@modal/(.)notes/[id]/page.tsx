'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Note } from '@/types/note';
import { fetchNoteById } from '@/lib/api';

import Modal from '@/components/Modal/Modal';
import NotePreview from './NotePreview.client';

type Props = {
  params: Promise<{ id: string }>;
};

export default function NoteModalPage({ params }: Props) {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    async function loadNote() {
      const { id } = await params;
      const data = await fetchNoteById(id);
      setNote(data);
    }

    loadNote();
  }, [params]);

  if (!note) {
    return <p>Loading...</p>;
  }

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview note={note} />
    </Modal>
  );
}