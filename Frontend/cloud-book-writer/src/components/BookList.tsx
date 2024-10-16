import React from 'react';
import { Section } from '../pages/Home';
import styles from '../styles/BookList.module.css';

interface BookWithTitle extends Section {
  title: string;
}

interface BookListProps {
  books: BookWithTitle[];
  onSelectBook: (book: Section) => void;
  onDeleteBook: (bookId: string) => void;
  selectedBookId: string | null;
}

const BookList: React.FC<BookListProps> = ({
  books, onSelectBook, onDeleteBook, selectedBookId,
}) => (
  <ul className={styles.bookList}>
    {books.map((book) => (
      <li key={book.id} className={styles.bookItem}>
        <button
          className={`${styles.bookItem} ${selectedBookId === book.id ? styles.selectedBook : ''}`}
          onClick={() => onSelectBook(book)}
          onKeyDown={(e) => e.key === 'Enter' && onSelectBook(book)}
          type="button"
        >
          {book.title}
        </button>
        <button type="button" onClick={() => onDeleteBook(book.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default BookList;
