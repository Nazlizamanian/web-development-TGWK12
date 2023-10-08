const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(`Original: ${password}`);
        console.log(`Hashed: ${hashedPassword}`);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function comparePasswords(plainTextPassword, hashedPassword) {
    try {
        if (!plainTextPassword || !hashedPassword) {
            console.error('Both plainTextPassword and hashedPassword must be provided');
            return false;
        }
        const match = await bcrypt.compare(plainTextPassword, hashedPassword);
        console.log(`Passwords match: ${match}`);
        return match;
    } catch (error) {
        console.error('Error comparing passwords:', error);
    }
}

if (require.main === module) {
    const password = process.argv[2];
    const hashedPassword = process.argv[3];

    if (!password || !hashedPassword) {
        console.error('Please provide a password and a hashed password as command-line arguments');
        process.exit(1);
    }

    (async () => {
        try {
            const hashed = await hashPassword(password);
            await comparePasswords(password, hashed);
        } catch (error) {
            console.error('Error in main function:', error);
        }
    })();
}

module.exports = {
    hashPassword,
    comparePasswords
};