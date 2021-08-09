const express = require('express');
const config = require('config');
const logger = require('./config/logger');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mongoose = require('mongoose');
const cors = require('./config/cors');
mongoose.Promise = global.Promise;

// Authenctication.
const swaggerDocument = YAML.load('./src/docs/swager.yaml');

const { host } = config.get('database');
mongoose
    .connect(`mongodb://${host}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        // Data seeds.
        require('./seed/seeder');
        logger.info('MongoDB connection has been established successfully.');
    })
    .catch(err => {
        logger.error(err);
        process.exit();
    });


app.use(cors());
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.static('public'));
app.use(bodyParser.json());

// Router.
app.use('/cars', require('./controllers/car/routes'));
app.use('/customers', require('./controllers/customer/routes'));
app.use('/races', require('./controllers/race/routes'));
app.use('/services', require('./controllers/service/routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    });
});

module.exports = app;
