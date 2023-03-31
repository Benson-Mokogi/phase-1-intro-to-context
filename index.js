// Your code here
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  createEmployeeRecord(["Gray", "Worm", "Security", 1])

function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
  }
 
 
function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
  
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employee;
  }

function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employee;
  }

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
  
    if (timeIn && timeOut) {
      const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
      return hoursWorked;
    } else {
      return 0;
    }
  }


function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    return hoursWorked * payRate;
  }

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((acc, date) => {
      return acc + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
  }

function calculatePayroll(employeeRecords) {
    const totalWages = employeeRecords.reduce((acc, employee) => {
      return acc + allWagesFor(employee);
    }, 0);
    return totalWages;
  }