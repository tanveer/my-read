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

  const searchBookTitle = async (e) => {
    e.preventDefault();
    if (e.target.value.trim()) {
      const res = await search(e.target.value, 10);
      if (res.error === "empty query" || e.target.value.trim() === "") {
        setSearchedBook([]);
        return;
      }
      const filter = res.filter(
        (r) => r.imageLinks !== undefined && r.authors !== undefined
      );
      if (filter.length) setSearchedBook(filter);
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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
