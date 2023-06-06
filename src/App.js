import "./App.css";
import { useState, useEffect } from "react";
import BookShelf from "./BookShelf";
import { getAll, update, search } from "./BooksAPI";
import Book from "./Book";

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
    const res = await search(e.target.value, 10);
    if (res.length) setSearchedBook(res);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={searchBookTitle}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {searchedBooks &&
                searchedBooks.map((book) => (
                  <Book book={book} handleShelfUpdate={handleShelfUpdate} />
                ))}
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf
              books={books}
              shelf={"currentlyReading"}
              title={"Currently Reading"}
              handleShelfUpdate={handleShelfUpdate}
            />
            <BookShelf
              books={books}
              shelf={"wantToRead"}
              title={"Want to Read"}
              handleShelfUpdate={handleShelfUpdate}
            />
            <BookShelf
              books={books}
              shelf={"read"}
              title={"Read"}
              handleShelfUpdate={handleShelfUpdate}
            />
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
