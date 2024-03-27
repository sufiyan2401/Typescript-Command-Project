#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to start the game
function startGame() {
    const minNumber = 1;
    const maxNumber = 100;
    const targetNumber = getRandomNumber(minNumber, maxNumber);
    let attempts = 0;

    console.log(chalk.green('Welcome to the Number Guessing Game! Guess a number between 1 and 100.'));

    const promptUser = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'guess',
                message: 'Enter your guess:',
                validate: (input: string) => {
                    const guess = parseInt(input);
                    if (isNaN(guess) || guess < minNumber || guess > maxNumber) {
                        return 'Please enter a valid number between 1 and 100.';
                    }
                    return true;
                }
            }
        ])
            .then((answers: { guess: string; }) => {
                const guess = parseInt(answers.guess);
                attempts++;

                if (guess === targetNumber) {
                    console.log(chalk.blue(`Congratulations! You've guessed the number ${targetNumber} in ${attempts} attempts.`));
                } else if (guess < targetNumber) {
                    console.log(chalk.yellow('Too low! Try again.'));
                    promptUser();
                } else {
                    console.log(chalk.yellow('Too high! Try again.'));
                    promptUser();
                }
            });
    };

    promptUser();
}

// Start the game
startGame();