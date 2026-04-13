const mongoose = require('mongoose');
const Admin = require('./src/models/admin');
const bcrypt = require('bcrypt');
require('dotenv').config();

const testLogin = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");
        
        const email = 'admin@nutrinest.com';
        const password = 'nutrinest123';
        
        console.log(`Searching for admin with email: ${email}`);
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            console.log("[ERROR] Admin user not found!");
        } else {
            console.log("[INFO] Admin user found.");
            console.log(`Stored Hash: ${admin.password}`);
            
            console.log(`Comparing password: '${password}'`);
            const isMatch = await bcrypt.compare(password, admin.password); // Direct compare
            // Also try the method
            const isMatchMethod = await admin.matchPassword(password);
            
            console.log(`[RESULT] Direct bcrypt compare: ${isMatch}`);
            console.log(`[RESULT] Model method compare: ${isMatchMethod}`);
            
            if (!isMatch) {
                console.log("Password mismatch! The hash in DB does not match 'nutrinest123'.");
            } else {
                console.log("Password matches! Login should work.");
            }
        }
    } catch(e) { 
        console.error("[ERROR]", e); 
    }
    process.exit();
};
testLogin();
