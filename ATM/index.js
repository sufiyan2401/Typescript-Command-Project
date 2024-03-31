#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
async function main() {
    let myBalance = 10000;
    let myPin = "1234";
    console.log(chalk.yellow("Welcome to Atm Simulatron"));
    console.log(chalk.yellow("~~~~~~~~~~~~~~~~~~~~~"));
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: chalk.cyan("Enter your PIN:"),
            type: "password"
        }
    ]);
    if (pinAnswer.pin === myPin.toString()) {
        console.log(chalk.green("\nCorrect PIN entered!"));
        console.log(chalk.green("~~~~~~~~~~~~~~~~~~~~~\n"));
        let operationAnswer = await inquirer.prompt([
            {
                name: "operation",
                message: chalk.cyan("Please select an option:"),
                type: "list",
                choices: [
                    chalk.yellow("Withdraw"),
                    chalk.yellow("Check Balance"),
                    chalk.yellow("Fast Cash")
                ]
            }
        ]);

        if (operationAnswer.operation === "Withdraw") {
            let amountAnswer;
            let isValidAmount = false;
            while (!isValidAmount) {
                amountAnswer = await inquirer.prompt([
                    {
                        name: "amount",
                        message: chalk.cyan("Enter the amount to withdraw (Minimum: $500):"),
                        type: "number"
                    }
                ]);
                if (amountAnswer.amount < 500) {
                    console.log(chalk.red('Minimum withdrawal amount is $500.'));
                }
                else if (amountAnswer.amount > myBalance) {
                    console.log(chalk.red('Insufficient funds.'));
                }
                else {
                    isValidAmount = true;
                }
            }
            myBalance -= amountAnswer.amount;
            console.log(chalk.green("\nWithdrawal successful."));
            console.log(chalk.green("Your remaining balance is: $" + myBalance));
        }
        else if (operationAnswer.operation === "Check Balance") {
            console.log(chalk.green("\nYour balance is: $" + myBalance));
        }
        else if (operationAnswer.operation.includes("Fast Cash")) {
            let fastCashAmounts = [500, 1000, 2000, 3000, 3500, 4000, 5000];
            let fastCashAnswer = await inquirer.prompt([
                {
                    name: "amount",
                    message: chalk.cyan("Select the fast cash amount:"),
                    type: "list",
                    choices: fastCashAmounts.map(amount => ({
                        name: `$${amount}`,
                        value: amount
                    }))
                }
            ]);
            if (fastCashAnswer.amount > myBalance) {
                console.log(chalk.red("\nInsufficient funds."));
            }
            else {
                myBalance -= fastCashAnswer.amount;
                console.log(chalk.green("\nFast Cash withdrawal of $" + fastCashAnswer.amount + " successful."));
                console.log(chalk.green("Your remaining balance is: $" + myBalance));
            }
        }
    }
    else {
        console.log(chalk.red("\nIncorrect PIN."));
    }
}
main();
