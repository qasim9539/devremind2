// require('dotenv').config()
// const express = require('express');
// const app = express();
// const authRoute = require('./router/auth-router');
// const contactRoute = require('./router/contact-router');
// const serviceRoute = require('./router/service-router');
// const adminRoute = require('./router/admin-router');
// const connectDb = require('./utils/db');
// const path = require("path");
// const errorMiddleware = require('./middlewares/error-middleware');
// const cors = require('cors')


// const corsOptions = {
//     origin: 'http://localhost:5173',
//     method: "GET, HEAD, PUT, PATCH, POST, DELETE",
//     credentials: true
// }


// app.use(cors(corsOptions));

// app.use(express.json())

// app.use("/api/auth", authRoute);
// app.use("/api/form", contactRoute);
// app.use("/api/data", serviceRoute);
// app.use("/api/admin", adminRoute);


// app.use(errorMiddleware);


// app.get("/", (req, res) => {
//     app.use(express.static(path.resolve(__dirname, "client", "build")));
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });



// const PORT = 5000;



// connectDb().then(() => {
//     app.listen(PORT, () => {
//         console.log(`server is running ${PORT}`)
//     })
// })


























require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
};

// Enable CORS
app.use(cors(corsOptions));

// Parse JSON requests
app.use(express.json());

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

// Error Middleware
app.use(errorMiddleware);

// Serve Static Files from Vite/React Build Folder
const buildPath = path.resolve(__dirname, "client", "dist"); // Adjust "dist" to "build" if using CRA
app.use(express.static(buildPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

// Server Port
const PORT = process.env.PORT || 5000;

// Connect to Database and Start Server
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to the database:", err);
});
