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

const convertToMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

const workTime = (startWork, endWork, startMeeting,lasting) => {
  const startMinutes = convertToMinutes(startWork);
  const endMinutes = convertToMinutes(endWork);
  const meetingEnd = startMeeting + lasting;
  if (startMeeting >= startMinutes && meetingEnd <= endMinutes) {
    return true;
  } else {
    return false;
  }
};

workTime('8:00', '17:00', 600, 120);
workTime('9:00', '13:30', 800, 180);
