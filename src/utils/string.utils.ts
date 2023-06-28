/**
 * Utility functions for string manipulation.
 * @class
 */
export class StringUtils {
  /**
   * Converts a string to snake case.
   * @param {string} str - The input string to convert to snake case.
   * @returns {string} The converted string in snake case.
   */
  public static toSnakeCase(str: string): string {
    return str
      .replace(/([A-Z])/g, '_$1')
      .replace(/-/g, '_')
      .toLowerCase();
  }
}
