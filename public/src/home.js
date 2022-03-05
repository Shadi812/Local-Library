//used books.length to find the total amount of books
function getTotalBooksCount(books) {
  return books.length;
}

//used accounts.length to find the total number of accounts.
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((total, book) => {
    return (total + book.borrows.reduce((last, borrow) => {
      return last + !borrow.returned ? 1 : 0;
      }, 0)
    );
  }, 0);
}

function getMostCommonGenres(books) {
  const genres = [];
  
  books.map((book) => {
    
    const genreFound = genres.find((genre) => genre.name === book.genre);
    
    if (genreFound) genreFound.count++;
    else genres.push({name: book.genre, count: 1});
  });
  
  genres.sort((genreA, genreB) => (genreB.count - genreA.count));
  return genres.slice(0, 5);
}


function getMostPopularBooks(books) {
  const mostPop = [];
  
  books.map((book) => {
    mostPop.push({name: book.title, count: book.borrows.length});
  });

  mostPop.sort((bookA, bookB) => (bookB.count - bookA.count));
  return mostPop.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  const popAuthor = [];

  authors.map((author) => {
    const name = `${author.name.first} ${author.name.last}`;
    const foundAuthor = popAuthor.find((authorInfo) => authorInfo.name === name);
    const count = books.reduce((total, book) => {
      return total + (book.authorId === author.id ? book.borrows.length : 0)
    }, 0);

    if (foundAuthor) foundAuthor.count += count;
    else popAuthor.push({name: name, count: count});
  });
  
  popAuthor.sort((authorA, authorB) => authorB.count - authorA.count);
  return popAuthor.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
