const BookCover = ({ imageLinks }) => {
  return (
    <div
      className="book-cover"
      style={{
        width: 130,
        height: 200,
        backgroundImage: `url(${
          imageLinks.thumbnail ? imageLinks.thumbnail : ""
        })`,
      }}
    ></div>
  );
};

export default BookCover;
