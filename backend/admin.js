// admin.js
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const express = require('express');
const mongoose = require('mongoose');

// Import your models
const Contact = require('./models/Contact');
const Project = require('./models/Project');
const Admin = require('./models/Admin'); // for admin login

// Register Mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Initialize express app
const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Configure AdminJS
const adminJs = new AdminJS({
  resources: [
    { resource: Contact, options: { } },  // manage Contact data
    { resource: Project, options: { } },  // manage Project data
  ],
  rootPath: '/admin',
});

// Optional: Use Admin model for login authentication
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    // Find admin in database
    const admin = await Admin.findOne({ username: email });
    if (admin && admin.password === password) {
      return admin;
    }
    return null;
  },
  cookieName: 'adminjs',
  cookiePassword: 'someSecretPassword123', // change to a strong secret
});

// Use AdminJS router
app.use(adminJs.options.rootPath, router);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`AdminJS running at http://localhost:${PORT}/admin`));
