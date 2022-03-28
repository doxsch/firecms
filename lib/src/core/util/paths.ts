/**
 * Remove the entity ids from a given path
 * `products/B44RG6APH/locales` => `products::locales`
 * @param path
 */
export function stripCollectionPath(path: string): string {
    return fullPathToCollectionSegments(path).reduce((a, b) => `${a}::${b}`);
}

/**
 * Extract the collection path routes
 * `products/B44RG6APH/locales` => [`products`, `locales`]
 * @param path
 */
export function fullPathToCollectionSegments(path: string): string[] {
    return path
        .split("/")
        .filter((e, i) => i % 2 === 0);
}