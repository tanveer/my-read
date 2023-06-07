import Book from "./Book";
import { Link } from "react-router-dom";

const SearchPage = (props) => {
  const { searchBookTitle, handleShelfUpdate, searchedBooks } = props;

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
              <Book book={book} handleShelfUpdate={handleShelfUpdate} />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
