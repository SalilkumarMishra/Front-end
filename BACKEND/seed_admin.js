const mongoose = require('mongoose');
const Admin = require('./src/models/admin');
require('dotenv').config();

const create = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);
        
        const email = 'admin@nutrinest.com';
        const password = 'admin123';
        
        const exists = await Admin.findOne({ email });
        if (exists) {
            console.log(`[INFO] Admin account '${email}' already exists.`);
        } else {
            await Admin.create({ email, password });
            console.log(`[SUCCESS] Admin created successfully!`);
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
        }
    } catch(e) { 
        console.error("[ERROR]", e); 
    }
    process.exit();
};
create();
