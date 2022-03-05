function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
 
}


function findBookById(books, id) {
  return books.find((book) => book.id === id);
}


//helper function for partitionBooksByBorrowedStatus.
function booksReturned(book){
  return book.borrows.every((borrow)=> borrow.returned);}


function partitionBooksByBorrowedStatus(books) {
  const booksOut = [];
  const booksIn = [];

  books.map((book) => {
    booksReturned(book) ? booksIn.push(book) : booksOut.push(book);
  });
  const bookTracking = [[...booksOut], [...booksIn]];
  return bookTracking;
}

 
function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  book.borrows.map((borrow) => {
    let foundAcc = accounts.find((account) => account.id === borrow.id);
    foundAcc = {...foundAcc, returned: borrow.returned};
    borrowers.push(foundAcc);
  });
  return borrowers.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
