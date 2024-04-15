export function getNextValue(keys, prev) {
    return keys[(keys.indexOf(prev) + 1) % keys.length]
}
