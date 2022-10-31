const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const session = require('express-session');

const { connectDB } = require('./config/db');
const { clientError, serverError } = require('./controllers/error');
const userRouter = require('./routes/user.router');
const { dev } = require('./config/index');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log(chalk.blue(`server is running at http://localhost:${port}`));
    await connectDB();
});

// swagger setup starts
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'A REST Test API'
        },
        servers: [
            {
                url: `http://localhost:${port}`
            }
        ]
    },
    apis: ['./controllers/*.js']
};
const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
// swagger setup ends

// setting middlewares

app.use(
    session({
        secret: dev.app.secretKey,
        resave: false,
        saveUninitialized: true
    })
);

app.use(cors());
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.status(200).render('test');
});

app.use('/api/v1/users', userRouter);

app.use(clientError);
app.use(serverError);

// user management
// 1. register the user
// 2. login the user
// 3. logout the user
// 4. session
// 5. email verification
// 6. resend verification email
// 7. reset password
// 8. show the user profile, update, delete

// admin management
// 1. reset password
// 2. add, delete, update user
// 3. pagination
// 4. searching users
