import { react } from "react";
import Book from "./Book";

const BookShelf = (props) => {
  const { books, shelf, title, handleShelfUpdate } = props;
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(
              (book) =>
                book.shelf === shelf && (
                  <Book
                    book={book}
                    handleShelfUpdate={handleShelfUpdate}
                    key={book.id}
                  />
                )
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default BookShelf;
