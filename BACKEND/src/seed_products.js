// Run with: node src/seed_products.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const products = [
  {
    name: "California Almonds (200g)",
    category: "Dry Fruits",
    price: 450,
    originalPrice: 600,
    stock: 100,
    image:
      "https://imgs.search.brave.com/lizAfs6qEc-ICPra7IlHIELmMctph64QPmV36dZdB0k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vdmFyaWFu/dHMvUEZnVjNHWjhR/M2tWS285VU5DelFY/ZG16LzYyNGYwZGMx/ZGZmOWJkY2NhYjAz/MmY5M2MzM2U3OWRl/Nzg0ODE3NzBlNzll/MjFkM2IwNDY5ZGFm/NTFmMDI3OTc",
    status: "Active",
  },
  {
    name: "Premium Cashews (200g)",
    category: "Dry Fruits",
    price: 380,
    originalPrice: 500,
    stock: 100,
    image:
      "https://imgs.search.brave.com/zuQJxiEAD5sTCHeeVFDvsqnJI7AaRA8Zqg9mXIZhT3E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcG9zdC5o/ZWFsdGhsaW5lLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OS8xMC9jYXNoZXct/bnV0LW51dHMtYm93/bC0xMjk2eDcyOC1o/ZWFkZXItMTI5Nng3/MjguanBnP3c9MTE1/NSZoPTE1Mjg",
    status: "Active",
  },
  {
    name: "Walnut Kernels (200g)",
    category: "Dry Fruits",
    price: 650,
    originalPrice: 800,
    stock: 100,
    image:
      "https://imgs.search.brave.com/6RU9eObCe_z9Oy4MEPbURG_Dj3zy5jW4kjh_C_viz20/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzgxLzAwLzQx/LzM2MF9GXzQ4MTAw/NDEyMV9BZVp6SDRs/cnF1TFYzZVIyUEt1/WTBZMk0xcTJzVnpr/VC5qcGc",
    status: "Active",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Seeded products!");
  await mongoose.disconnect();
}

seed();
