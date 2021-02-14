class DetectiveBook extends Book {
    constructor(ISBN, authors, price, numOfPages, detective, crime) {
        super(ISBN, authors, price, numOfPages);
        this.detective = detective;
        this.crime = crime;
    }

    classifyCrime() {
        if (this.crime === "murder") {
            return 5;
        }
        if (this.crime === "corruption") {
            return 4;
        }
        if (this.crime === "robbery") {
            return 3;
        }
        if (this.crime === "Nikoli posty like el") {
            return 2;
        }
    }
}