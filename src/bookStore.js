var Author = /** @class */ (function () {
    function Author(name, lastName) {
        this.name = name;
        this.lastName = lastName;
    }
    Author.prototype.getLastName = function () {
        return this.lastName;
    };
    Author.prototype.getName = function () {
        return this.name;
    };
    Author.prototype.setName = function (name) {
        this.name = name;
    };
    Author.prototype.setLastName = function (lastName) {
        this.lastName = lastName;
    };
    return Author;
}());
var Book = /** @class */ (function () {
    function Book(name, author, pageCount) {
        this.name = name;
        this.author = author;
        this.pageCount = pageCount;
    }
    Book.prototype.getAuthor = function () {
        return this.author;
    };
    Book.prototype.getBookName = function () {
        return this.name;
    };
    Book.prototype.getPageCount = function () {
        return this.pageCount;
    };
    Book.prototype.setAuthor = function (author) {
        this.author = author;
    };
    Book.prototype.setBookName = function (bookName) {
        this.name = bookName;
    };
    Book.prototype.setPageCount = function (pageCount) {
        this.pageCount = pageCount;
    };
    return Book;
}());
var BookService = /** @class */ (function () {
    function BookService() {
        this.books = [];
    }
    BookService.prototype.getBooksByAuthor = function (author) {
        return this.books.filter(function (book) {
            var bookAuthor = book.getAuthor();
            return (bookAuthor.getName() === author.getName()) && (bookAuthor.getLastName() === author.getLastName());
        });
    };
    BookService.prototype.addBook = function (book) {
        this.books.push(book);
    };
    return BookService;
}());
var bookService = new BookService();
var authorOne = new Author('William', 'Shakespeare');
var authorTwo = new Author('Jack', 'London');
var book1 = new Book('Hamlet', authorOne, 300);
var book2 = new Book('Romeo and Juliet', authorOne, 260);
var book3 = new Book('The Call of the Wild', authorTwo, 260);
bookService.addBook(book1);
bookService.addBook(book2);
bookService.addBook(book3);
var authorOneBooks = bookService.getBooksByAuthor(authorOne);
var authorTwoBooks = bookService.getBooksByAuthor(authorTwo);
