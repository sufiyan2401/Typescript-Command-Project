import inquirer from 'inquirer';

async function main() {
    let myBalance = 10000;
    let myPin = 1234;

    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: "Enter your pin",
            type: "number"
        }
    ]);

    if (pinAnswer.pin === myPin) {
        console.log("Correct pin code!!!");

        let operationAnswer = await inquirer.prompt([
            {
                name: "operation",
                message: "Please select option",
                type: "list",
                choices: ["withdraw", "check balance"]
            }
        ]);

        if (operationAnswer.operation === "withdraw") {
            let amountAnswer;
            let isValidAmount = false;

            while (!isValidAmount) {
                amountAnswer = await inquirer.prompt([
                    {
                        name: "amount",
                        message: "Enter your amount Minimum Amount 500",
                        type: "number"
                    }
                ]);

                if (amountAnswer.amount < 500) {
                    console.log('Enter Minimum Amount 500');
                } else {
                    isValidAmount = true;
                }
            }

            myBalance -= amountAnswer.amount;
            console.log("Your remaining balance is: " + myBalance);

        } else if (operationAnswer.operation === "check balance") {
            console.log("Your balance is: " + myBalance);
        }
    } else {
        console.log("Incorrect pin number");
    }
}

main();
