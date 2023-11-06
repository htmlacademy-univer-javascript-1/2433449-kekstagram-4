function checkStringLength(string, maxLength) {
  return (string.length <= maxLength);
}
checkStringLength('sldskdsl', 10);

function isPalindrom(string) {
  const cleanedString = string.toLowerCase().split(' ').join('');
  const reversedString = cleanedString.split('').reverse().join('');
  return cleanedString === reversedString;
}
isPalindrom('aboba');

function getNumberFromText(string) {
  for (let i=0; i<string.length;i++) {
    const stringOfNumbers =+ (!isNaN(string[i])) ? string[i] : '';
  }
  return parseInt(stringOfNumbers, 10);
}

function getNumberFromText(arg) {
  const string = arg.toString();
  let result = '';
  for (let i=0; i<string.length;i++) {
    if (!isNaN(string[i])) {
      result += string[i];
    }
  }
  return parseInt(result, 10)
}
