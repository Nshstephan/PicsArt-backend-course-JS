class ScientificBook extends Book {
    constructor(ISBN, authors, price, numOfPages, field, citationIndex) {
        super(ISBN, authors, price, numOfPages);
        this.field = field;
        this.citatinIndex = citationIndex;
    }

    isHumanities(){
        if (this.field === "law" || this.field === "art" || this.field === "politics"){
            return true;
        }
        return false;
    }

    isPopular(){
        return this.citatinIndex > 0.1;
    }
}