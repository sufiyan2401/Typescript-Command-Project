#! /usr/bin/env node
import inquirer from "inquirer";
let answer = await inquirer.prompt([
  { message: "Enter First Number", name: "firstname", type: "number" },
  { message: "Enter second Number", name: "secondname", type: "number" },
  {
    message: "select one from the given options :",
    name: "option",
    type: "list",
    choices: ["Addition", "Subtraction", "Multiplication", "Division"]
  },
]);
if (answer.option === 'Addition') {
  console.log(answer.firstname + answer.secondname);
}
else if (answer.option === 'Subtraction') {
  console.log(answer.firstname - answer.secondname);
}
else if (answer.option === 'Multiplication') {
  console.log('Your answer will be :' + answer.firstname * answer.secondname);
}
else if (answer.option === 'Subtraction') {
  console.log(answer.firstname / answer.secondname);
}
else {
  console.log('Please put valid numbers ');
}
