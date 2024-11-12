/**
 * Delays the test scirpt by specified seconds
 *
 * @param {number} second
 * @returns promise
 */
export default function delay(second) {
   return new Promise(resolve => setTimeout(resolve, second * 1000));
}
