require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const reviewRoutes = require("./routes/review");

const adminRoutes = require("./routes/admin"); // Import admin routes
const errorHandler = require("./middleware/errorHandler");
const socketHelper = require("./utils/socket");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes); // Mount admin routes

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);

// initialize socket.io and attach to server
const io = socketHelper.init(server, {
  cors: { origin: "*" },
});

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// expose io for other modules if needed via require('./utils/socket').getIO()
