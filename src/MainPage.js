import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const MainPage = ({ books, handleShelfUpdate }) => {
  return (
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
        <Link to="/search" />
      </div>
    </div>
  );
};

export default MainPage;
