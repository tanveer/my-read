import Book from "./Book";
import { Link } from "react-router-dom";

const SearchPage = (props) => {
  const { searchBookTitle, handleShelfUpdate, searchedBooks, books } = props;

  //   searchedBooks.push(...books);

  //   const filteredBooks = searchedBooks.filter((book) => {
  //     if (book.shelf === "none") {
  //       return !searchedBooks.some(
  //         (otherBook) => book.id === otherBook.id && book.shelf !== "none"
  //       );
  //     }
  //     return true;
  //   });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
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
              <Book
                book={book}
                handleShelfUpdate={handleShelfUpdate}
                key={book.id}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
