export const kebabFormatter = (text: string, isNoLowerCase?: boolean): string =>
  isNoLowerCase
    ? text.split(' ').join('-')
    : text.toLowerCase().split(' ').join('-');
