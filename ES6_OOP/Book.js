class Book {
    constructor(ISBN, authors, price, numOfPages) {
        this.ISBN = ISBN;
        this.authors = authors;
        this.price = numOfPages;
    }

    getCountryCode() {
        return this.ISBN.slice(0, 3);
    }
}


