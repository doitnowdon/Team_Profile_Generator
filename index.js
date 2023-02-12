// Packeges 

// file system
const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-generator');
const Employee = require('./assets/Employee');
const Engineer = require('./assets/Engineer');
const Intern = require('./assets/Intern');
const Manger = require('./assets/Manger');
const employees = [];

// function for the html file write 
const writeFile = (data) => {
    return new Promise((resolve, reject ) => {
        fs.writeFile('./dist/index.html' , data, err => {
            if(err){
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: ' HTML file had created ..!'
            });
        });
    });
};

// This function call to other employee functoin to make team object
const init = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `PLEASE ENTER TEAM MANGER NAME HERE: `,
            validate: nameInput =>{
                if(nameInput){
                    return true;
                }else{
                    console.log(`PLEASE ENTER TEAM MANAGER NAME HERE:`);
                    return false;
                }
            }
        },
        {
            type: `input`,
            name: `id`,
            message: `PLEASE ENTER TEAM MEMBER'S ID HERE: `,
            validate: idInput =>{
                if(idInput){
                    return true;
                }else{
                    console.log(`PLEASE ENTER TEAM MEMBER'S ID HERE:`);
                    return false;
                }
            }
        },{
            type: `input`,
            name: `email`,
            message: `PLEASE ENTER TEAM MANAGER'S EMAIL HERE: `,
            validate: emailInput =>{
                if(emailInput){
                    return true;
                }else{
                    console.log(`PLEASE ENTER TEAM MANAGER'S EMAIL HERE:`);
                    return false;
                }
            }
        },{
            type: `input`,
            name: `office`,
            message: `PLEASE ENTER TEAM MANAGER'S OFFICE NUMBER HERE: `,
            validate: officeInput =>{
                if(officeInput){
                    return true;
                }else{
                    console.log(`PLEASE ENTER TEAM MANAGER'S OFFICE NUMBER HERE:`);
                    return false;
                }
            }
        },{
            type: `list`,
            name: `addMoreEmp`,
            message: `ARE YOU LIKE TO ADD ANOTHER EMPLOYEE ?? `,
            choices: ['ADD ENGINEER', 'ADD INTERN', 'DONE MY ADDING']
        }
    ])

    .then(data => {
        const { name, id, email, office, addMoreEmp } = data;
        const manager = new Manger(name, id, email, office);

        employees.push(manager);
        return addMoreEmp;

    });
} 

const addEmployee = (data) => {
    if(data === 'ADD ENGINEER'){
        return inquirer.prompt([
            {
                type: `input`,
                name: `name`,
                message: `PLEASE ENTER ENGINEE'S NAME HERE:`,
                validate: nameInput => {
                    if(nameInput){
                        return true;
                    } else {
                        console.log(`PLEASE ENTER ENGINEES NAME HERE:`);
                        return false;
                    }
                }
            },
            {
                type: `input`,
                name: `id`,
                message: `PLEASE ENTER ENGINEE'S ID HERE:`,
                validate: idInput => {
                    if(idInput){
                        return true;
                    } else {
                        console.log(`PLEASE ENTER ENGINEE'S ID HERE:`);
                        return false;
                    }
                }
            },{
                type: `input`,
                name: `email`,
                message: `PLEASE ENTER ENGINEE'S EMAIL HERE:`,
                validate: emailInput => {
                    if(emailInput){
                        return true;
                    } else {
                        console.log(`PLEASE ENTER ENGINEE'S EMAIL HERE:`);
                        return false;
                    }
                }
            },{
                type: `input`,
                name: `github`,
                message: `PLEASE ENTER ENGINEE'S GITHUB USER NAME HERE:`,
                validate: githubInput => {
                    if(githubInput){
                        return true;
                    } else {
                        console.log(`PLEASE ENTER ENGINEE'S GITHUB USER NAME HERE:`);
                        return false;
                    }
                }
            },{
                type: `list`,
                name: `addMoreEmp`,
                message: `ARE YOU LIKE TO ADD ANOTHER EMPLOYEE ?? `,
                choices: ['ADD ENGINEER', 'ADD INTERN', 'DONE MY ADDING']
            }
        ])
        .then(data => {
            const { name, id, email, github, addMoreEmp } = data;
            const engineer = new Engineer(name, id, email, github);

            employees.push(engineer);
            addEmployee(addMoreEmp);
        })
    } else if (data === 'ADD INTERN'){
        return inquirer.prompt([
            {
                type: `input`,
                name: `name`,
                message: `PLEASE ENTER INTERN'S NAME HERE:`,
                validate: nameInput => {
                    if(nameInput){
                        return true;
                    } else {
                        console.log(`PLEASE ENTER INTERN'S NAME HERE:`);
                        return false;
                    }
                }
            },{
                type: `input`,
                name: `id`,
                message: `PLEASE ENTER INTERN'S ID HERE:`,
                validate: idInput => {
                    if(idInput){
                        return true;
                    } else {
                        console.log(`PLEASE ENTER INTERN'S ID HERE:`);
                        return false;
                    }
                }
            },{
                type: `input`,
                name: `email`,
                message: `PLEASE ENTER INTERN'S EMAIL HERE:`,
                validate: emailInput => {
                    if(emailInput){
                        return true;
                    } else {
                        console.log(`PLEASE ENTER INTERN'S EMAIL HERE:`);
                        return false;
                    }
                }
            },{
                type: `input`,
                name: `school`,
                message: `PLEASE ENTER INTERN'S SCHOOL HERE:`,
                validate: schoolInput => {
                    if(schoolInput){
                        return true;
                    } else {
                        console.log(`PLEASE ENTER INTERN'S SCHOOL HERE:`);
                        return false;
                    }
                }
            },{
                type: `list`,
                name: `addMoreEmp`,
                message: `ARE YOU LIKE TO ADD ANOTHER EMPLOYEE ?? `,
                choices: ['ADD ENGINEER', 'ADD INTERN', 'DONE MY ADDING']
            }
        ])
        .then(data => {
            const { name, id, email, school, addMoreEmp } = data;
            const intern = new Intern(name, id, email, school);

            employees.push(intern);
            addEmployee(addMoreEmp);
        })
    } else {
        const html = generatePage(employees);
        return writeFile(html);
    }
}

init()
    .then(data => {
        addEmployee(data)
    })
    .catch(err => {
        console.log(err);
    })