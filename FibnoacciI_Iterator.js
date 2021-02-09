let fibonacci = {
    [Symbol.iterator]: function () {
        let first = 0;
        let second = 1;
        return {
            next() {
                let third = first + second;
                first = second;
                second = third;
                return {
                    done: false,
                    value: third,
                }

            }
        }
    }
}

for (let value of fibonacci) {
    if (value > 20) {
        break;
    }
    console.log(value);
}