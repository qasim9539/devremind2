
const express = require('express');
const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router');
const connectDb = require('./utils/db');
const path = require('path');
const errorMiddleware = require('./middlewares/error-middleware');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);
app.use('/api/admin', adminRoute);

// Middleware
app.use(errorMiddleware);

// Serve Static Files (React Build)
app.use(express.static(path.resolve(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Export the app
module.exports = app;

// Connect to DB and start server locally (if running locally)
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    connectDb().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
}

