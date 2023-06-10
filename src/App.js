import "./App.css";
import { useState, useEffect } from "react";
import BookShelf from "./BookShelf";
import { getAll, update, search } from "./BooksAPI";
import { Routes, Route, Link } from "react-router-dom";
import Book from "./Book";
import SearchPage from "./SearchPage";
import MainPage from "./MainPage";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBook] = useState([]);

  const fetchBooks = async () => {
    const res = await getAll();
    setBooks(res);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleShelfUpdate = async (book, value) => {
    await update(book, value);
    fetchBooks();
  };

  const removeBookAlreadyOnShelf = (filteredBooks, e) => {
    //remove books that don't match the query string
    const newBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.trim())
    );

    const filterBooksAlreadyOnShelf = newBooks.filter((book, index, self) => {
      if (!book.hasOwnProperty("shelf")) {
        const hasDuplicateWithShelf = self.some(
          (b) => b.id === book.id && b.hasOwnProperty("shelf")
        );
        return !hasDuplicateWithShelf;
      } else {
        return true;
      }
    });
    return filterBooksAlreadyOnShelf;
  };

  const searchBookTitle = async (e) => {
    e.preventDefault();
    if (e.target.value.trim()) {
      const res = await search(e.target.value, 10);
      if (res.error === "empty query" || e.target.value.trim() === "") {
        setSearchedBook([]);
        return;
      }
      const filteredBooks = res.filter(
        (r) => r.imageLinks !== undefined && r.authors !== undefined
      );

      // merged both current books and searched books
      filteredBooks.push(...books);

      // filter books already on he shelf fro the merged array based on 'shelf' property
      // since the newlly searched books has no property called 'shelf' we can filter it out.
      const filterBooksAlreadyOnShelf = removeBookAlreadyOnShelf(
        filteredBooks,
        e
      );
      setSearchedBook(filterBooksAlreadyOnShelf);
    } else {
      setSearchedBook([]);
    }
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <MainPage books={books} handleShelfUpdate={handleShelfUpdate} />
          }
        />
        <Route
          path="/search"
          element={
            <SearchPage
              searchBookTitle={searchBookTitle}
              handleShelfUpdate={handleShelfUpdate}
              searchedBooks={searchedBooks}
              books={books}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
