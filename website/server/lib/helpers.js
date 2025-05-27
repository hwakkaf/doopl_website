export default class Helpers {

  static toTextCase(str) {
    if (!str || typeof str !== 'string') return '';
    return str
    // Replace all underscores and hyphens with spaces
    .replace(/[_-]/g, ' ')
    // Add space before capital letters and convert to lowercase
    .replace(/([A-Z]+)/g, ' $1')
    // Convert entire string to lowercase
    .toLowerCase()
    // Trim any leading/trailing spaces and collapse multiple spaces
    .trim()
    .replace(/\s+/g, ' ');
  }

  static toSnakeCase(str) {
    if (!str || typeof str !== 'string') return '';
    return str
    // Replace all underscores and hyphens with spaces
    .replace(/[-]/g, '_')
    // Add space before capital letters and convert to lowercase
    .replace(/^([A-Z]+)/g, (match) => `${match.toLowerCase()}`)
    .replace(/([A-Z]+)/g, '_$1')
    // Convert entire string to lowercase
    .toLowerCase()
    // Trim any leading/trailing spaces and collapse multiple spaces
    .trim()
    .replace(/\s+/g, '_');

  }

  static toCamelCase(str) {
    if (!str || typeof str !== 'string') return '';
    return str
    // Trim any leading/trailing spaces and collapse multiple spaces
    .trim()
    .replace(/\s+/g, '_')
    // Replace all hyphens/underscores followed by letter with uppercase letter
    .replace(/[-_\s](.)/g, (_, char) => char.toUpperCase())
    // Handle cases where first character might be uppercase
    .replace(/^[A-Z]/, (firstChar) => firstChar.toLowerCase())
  }

  static toKebabCase(str) {
    if (!str || typeof str !== 'string') return '';

  }

  static toPascalCase(str) {
    if (!str || typeof str !== 'string') return ';'

  }
  
  static capitalize(str) {
    if (!str || typeof str !== 'string') return '';
    str = str.toLowerCase();
    str[0] = str[0].toUpperCase();
  }

}