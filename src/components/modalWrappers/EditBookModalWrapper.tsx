import EditBook from '@/pages/Book/EditBook';
import React, { useState } from 'react';
import { useParams } from 'react-router';

const EditBookModalWrapper: React.FC = () => {
    const { id } = useParams(); 
  const [open, setOpen] = useState(true);

    return (
        <EditBook open={open} onOpenChange={setOpen} bookId={id!} />
    );
};

export default EditBookModalWrapper;