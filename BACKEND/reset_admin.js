const mongoose = require('mongoose');
const Admin = require('./src/models/admin');
require('dotenv').config();

const reset = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");

        const email = 'admin@nutrinest.com';
        const password = 'nutrinest123';

        // Find and remove to ensure clean slate or just update
        await Admin.deleteOne({ email }); 
        
        // Create fresh
        const admin = new Admin({ email, password });
        await admin.save(); // Should trigger pre-save hash

        console.log(`[RESET] Admin recreated. Email: ${email} Pass: ${password}`);
    } catch(e) {
        console.error(e);
    }
    process.exit();
};
reset();
