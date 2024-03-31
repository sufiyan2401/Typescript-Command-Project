#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
let todos = [];
const styles = {
    title: chalk.bold.blue,
    todo: chalk.green,
    error: chalk.bold.red,
};
function displayTodos() {
    console.log(chalk.yellow('\nYour Todos:'));
    todos.forEach((todo, index) => {
        console.log(styles.todo(`${index + 1}. ${todo}`));
    });
}
async function startTodoApp() {
    console.log(styles.title('Welcome to Sleek Todo App'));
    let addMore = true;
    while (addMore) {
        let { todo } = await inquirer.prompt([
            {
                name: 'todo',
                message: chalk.cyan('Add a Todo:'),
                type: 'input',
            },
        ]);
        // todos.push(todo);
        if (todo.trim()) {
            todos.push(todo);
        }
        else {
            console.log(styles.error('Your todo is empty. Please add a valid todo.'));
        }
        displayTodos();
        let { addMoreOption } = await inquirer.prompt([
            {
                name: 'addMoreOption',
                message: chalk.cyan('Add more todos?'),
                type: 'confirm',
                default: true,
            },
        ]);
        addMore = addMoreOption;
    }
    console.log(chalk.yellow('\nThanks for using Stylish Todo App!'));
}
startTodoApp();
