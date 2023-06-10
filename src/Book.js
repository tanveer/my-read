import BookCover from "./BookCover";
import ShelfSelection from "./Selection";

const Book = (props) => {
  const { shelf, book, handleShelfUpdate } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <BookCover imageLinks={book.imageLinks} />
          <ShelfSelection
            shelf={shelf}
            book={book}
            handleShelfUpdate={handleShelfUpdate}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(", ") : ""}
        </div>
      </div>
    </li>
  );
};

export default Book;
