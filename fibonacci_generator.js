function* fibonacci() {
    let [previous, current] = [0, 1];
    while (true) {
        [previous, current] = [current, previous + current];
        yield current;
    }
}

for (let n of fibonacci()) {
    if (n > 50)
        break;
    console.log(n);
}
