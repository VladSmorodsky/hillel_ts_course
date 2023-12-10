interface IAuthor {
  getName(): string

  getLastName(): string

  setName(name: string): void

  setLastName(lastName: string): void
}

interface IBook {
  getBookName(): string,

  getPageCount(): number,

  getAuthor(): IAuthor,

  setBookName(bookName: string): void

  setPageCount(pageCount: number): void

  setAuthor(author: IAuthor): void
}

interface IBookService {
  authors: IAuthor[]

  books: IBook[]

  getBooks(): IBook[]

  getAuthors(): IAuthor[]

  getBooksByAuthor(author: IAuthor): IBook[]

  addBook(book: IBook): void

  addAuthor(author: IAuthor): void
}

class Author implements IAuthor {
  constructor(private name: string, private lastName: string) {
  }

  getLastName(): string {
    return this.lastName;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }
}

class Book implements IBook {
  name: string;
  author: IAuthor;
  pageCount: number;

  constructor(name: string, author: IAuthor, pageCount: number) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
  }

  getAuthor(): IAuthor {
    return this.author;
  }

  getBookName(): string {
    return this.name;
  }

  getPageCount(): number {
    return this.pageCount;
  }

  setAuthor(author: IAuthor): void {
    this.author = author;
  }

  setBookName(bookName: string): void {
    this.name = bookName;
  }

  setPageCount(pageCount: number): void {
    this.pageCount = pageCount;
  }
}

class BookService implements IBookService {
  books: IBook[] = [];
  authors: IAuthor[] = [];

  getBooksByAuthor(author: IAuthor): IBook[] {
    return this.books.filter((book) => {
      const bookAuthor: IAuthor = book.getAuthor();

      return (bookAuthor.getName() === author.getName()) && (bookAuthor.getLastName() === author.getLastName());
    });
  }

  addBook(book: IBook): void {
    this.books.push(book);
  }

  getBooks(): IBook[] {
    return this.books;
  }

  getAuthors(): IAuthor[] {
    return this.authors;
  }

  addAuthor(author: IAuthor): void {
    this.authors.push(author)
  }
}

const bookService = new BookService();

const authorOne = new Author('William', 'Shakespeare');
const authorTwo = new Author('Jack', 'London');

bookService.addAuthor(authorOne);
bookService.addAuthor(authorTwo);

const authors: IAuthor[] = bookService.getAuthors();

const book1 = new Book('Hamlet', authorOne, 300);
const book2 = new Book('Romeo and Juliet', authorOne, 260);
const book3 = new Book('The Call of the Wild', authorTwo, 260);

bookService.addBook(book1);
bookService.addBook(book2);
bookService.addBook(book3);

const authorOneBooks: IBook[] = bookService.getBooksByAuthor(authorOne);
const authorTwoBooks: IBook[] = bookService.getBooksByAuthor(authorTwo);
const books: IBook[] = bookService.getBooks();