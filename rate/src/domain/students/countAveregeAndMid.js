export function countAvaregeAndMid(countsArr) {
    const midIndex = Math.floor(countsArr.length / 2)
    const mid = countsArr[midIndex]
    const average = countsArr.reduce((acc, el) => el + acc, 0) / countsArr.length

    const averageIndex = countsArr
        .map((_, i) => i)
        .sort((a, b) => Math.abs(countsArr[a] - average) - Math.abs(countsArr[b] - average))
        .at(0);

    return {
        midIndex,
        mid,
        average,
        averageIndex
    }
}