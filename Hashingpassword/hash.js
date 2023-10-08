const { hashPassword } = require('./password');

const password = "taylor123"; //Enter text-password for hasing. 

(async () => {
    try {
        const hashed = await hashPassword(password);
    } catch (error) {
        console.error('Error in main function:', error);
    }
})();