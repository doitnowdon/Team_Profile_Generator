function employeeCard(employee) {
    if (employee.getRole()==='Engineer') {
        return `
        <div class="shadow col-3 m-2">
            <div>
                <h2 class="text-center bg-secondary text-light p-2">
                    ${employee.getName()}<br>
                    Engineer
                </h2>
                <p class="text-center border">ID: ${employee.getId()}</p>
                <p class="text-center border">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></p>
                <p class="text-center border">GitHub: <a href="https://github.com/${employee.getGithub()}" target="_blank">${employee.getGithub()}</a></p>
            </div>
        </div>
        `
    } else if(employee.getRole()==='INTERN'){
        return `
        <div class="shadow col-3 m-2">
            <div>
                <h2 class="text-center bg-success text-light p-2">
                    ${employee.getName()}<br>
                    Intern
                </h2>
                <p class="text-center border">ID: ${employee.getId()}</p>
                <p class="text-center border">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></p>
                <p class="text-center border">School: ${employee.getSchool()}</p>
            </div>
        </div>
        `
    } else {
        return;
    }
}

function generateHTML(data) {
    const employeeCards = [];

    data.map(employee => {
        employeeCards.push(employeeCard(employee));
    });

    const joinedCards = employeeCards.join('');

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Builder</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <h1 class="bg-info col-12 text-center p-3 text-light">My Team</h1>
            </div>
            <div class="row justify-content-evenly p-3">
                <div class="shadow col-3 m-2">
                    <div>
                        <h2 class="text-center bg-danger text-light p-2">
                            ${data[0].getName()}<br>
                            Manager
                        </h2>
                        <p class="text-center border">ID: ${data[0].getId()}</p>
                        <p class="text-center border">Email: <a href="mailto:${data[0].getEmail()}">${data[0].getEmail()}</a></p>
                        <p class="text-center border">Office Number: ${data[0].getOfficeNum()}</p>
                    </div>
                </div>
                ${joinedCards}
            </div>
        </div>
    </body>
    </html>
    `;
}

function htmlFinish() {
    const html = `  </div>
    </main>
</body>
</html>`;


    fs.appendFile("./dist/index.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Your file has been generated! Go check the dist folder. Thank you!");
}


module.exports = generateHTML, htmlFinish;
