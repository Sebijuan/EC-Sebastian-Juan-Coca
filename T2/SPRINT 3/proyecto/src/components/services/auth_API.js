import bcrypt from 'bcryptjs';

const fakeAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
console.log('Loaded fakeAccounts from localStorage:', fakeAccounts);

function saveAccounts() {
    localStorage.setItem('accounts', JSON.stringify(fakeAccounts));
    console.log('Saved fakeAccounts to localStorage:', fakeAccounts);
}

function createAccount(username, email, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const account = {
        id: fakeAccounts.length + 1,
        username,
        email,
        password: hashedPassword
    };
    fakeAccounts.push(account);
    saveAccounts();
    console.log("Se ha registrado el usuario:", username);
    console.log("Hashed password:", hashedPassword);
    return account;
}

function loginAccount(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const account = fakeAccounts.find(acc => acc.email === email);
            if (account) {
                const isPasswordValid = bcrypt.compareSync(password, account.password);
                console.log("Password comparison result:", isPasswordValid);
                if (isPasswordValid) {
                    alert('Login successful!'); // Confirmation of success
                    resolve({ success: true, account });
                } else {
                    reject({ success: false, message: 'Credenciales inválidas' });
                }
            } else {
                reject({ success: false, message: 'Credenciales inválidas' });
            }
        }, 1000);
    });
}

function recoverPassword(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const account = fakeAccounts.find(acc => acc.email === email);
            if (account) {
                resolve({ success: true, message: 'Enlace de recuperación enviado' });
            } else {
                reject({ success: false, message: 'El correo no está registrado' });
            }
        }, 1000);
    });
}

function getAccounts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeAccounts);
        }, 1000);
    });
}

function checkUserExists(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Checking user existence for email:', email);
            const account = fakeAccounts.find(acc => acc.email === email);
            if (account) {
                console.log('User found:', account);
                resolve({ exists: true, account });
            } else {
                console.log('User not found for email:', email);
                resolve({ exists: false });
            }
        }, 1000);
    });
}

export { createAccount, loginAccount, recoverPassword, getAccounts, checkUserExists };


