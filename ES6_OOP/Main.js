import DetectiveBook from "./DetectiveBook";
import ScientificBook from "./ScientificBook";


const Sherlock = new DetectiveBook("11898971897", ["Conan Doyle"],
    5000, 300, "robbery");

const Nauka = new ScientificBook("787452987", ["NASA"],
    2000, 150, "physics", 0.75);

const VokrugSveta = new ScientificBook("0987859", ["RGU"],
    1500, 150, "tourism", 0.25);

console.log(Nauka.isPopular());
console.log(Sherlock.getCountryCode());