export function formatPrice(price) {
    return price
        .split("")
        .map((num, i) => {
            const iFromEnd = price.length - i;
            if (iFromEnd % 3 === 0) {
                return ' ' + num
            }
            return num
        })
        .join("");
}
