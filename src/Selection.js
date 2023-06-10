const ShelfSelection = (props) => {
  const { shelf, book, handleShelfUpdate } = props;
  const handleUpdate = (e) => {
    handleShelfUpdate(book, e.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select onChange={handleUpdate} value={book.shelf ? book.shelf : "none"}>
        <option value={"move"} disabled>
          Move to...
        </option>
        <option value={"currentlyReading"}>Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default ShelfSelection;
