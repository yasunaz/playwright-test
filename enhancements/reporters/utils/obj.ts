/**
 * Recursively filters an object by removing properties that are functions
 * or have keys starting with an underscore (_). It also handles circular references.
 *
 * @param {Object} obj - The input object to filter.
 * @param {WeakSet} [seen=new WeakSet()] - A WeakSet to track seen objects for circular reference handling.
 * @returns {Object} - A new object with the filtered properties.
 */
export function filterObjectDeep(obj, seen = new WeakSet()) {
    // If the input is not an object or is null, return it as is
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    // Handle Date objects by returning a new Date instance
    if (obj instanceof Date) {
      return new Date(obj);
    }
  
    // Handle Array by mapping each element through filterObjectDeep
    if (Array.isArray(obj)) {
      return obj.map(item => filterObjectDeep(item, seen));
    }
  
    // Check for circular references
    if (seen.has(obj)) {
      // Circular reference found; handle as needed (e.g., return undefined or a placeholder)
      return undefined; // or throw an error, or return null, based on your requirements
    }
  
    // Mark the current object as seen
    seen.add(obj);
  
    // Use Object.entries to get [key, value] pairs
    const filteredEntries = Object.entries(obj)
      // Filter out entries where:
      // 1. The key starts with '_'
      // 2. The value is a function
      .filter(([key, value]) => !key.startsWith('_') && typeof value !== 'function');
  
    // Reduce the filtered entries back into an object
    const result = filteredEntries.reduce((acc, [key, value]) => {
      const filteredValue = filterObjectDeep(value, seen);
      if (filteredValue !== undefined) { // Exclude properties that are undefined due to circular refs
        acc[key] = filteredValue;
      }
      return acc;
    }, {});
  
    // After processing, remove the object from the seen set to allow garbage collection
    seen.delete(obj);
  
    return result;
  }
  