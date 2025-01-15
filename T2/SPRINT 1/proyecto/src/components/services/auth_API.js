const fakeAccounts = [];

function createAccount(username, email, password) {
    const account = {
        id: fakeAccounts.length + 1,
        username,
        email,
        password
    };
    fakeAccounts.push(account);
    console.log("Se ha intentado registrar el usuario")
    return account;
}

function getAccounts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeAccounts);
        }, 1000);
    });
}


