// Imports
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')
const db = require('./config/db')
const express = require('express')
const cookieParser = require('cookie-parser')
const UserRouter = require('./routes/users')
const ModelRouter = require('./routes/model')
const BrandRouter = require('./routes/brands')
const ProductRouter = require('./routes/product')
const VendorsRouter = require('./routes/vendors')
const ProjectRouter = require('./routes/project')
const AssetEntryRouter = require('./routes/assetEntry')
const ConditionsRouter = require('./routes/conditions')
const AssetTypesRouter = require('./routes/assetTypes')
const AssetCategoryRouter = require('./routes/assetCategory')
const DepreciatinRouter = require('./routes/depreciationMethods')
const AssetSubCategoryRouter = require('./routes/assetSubCategory')


// Database Connection
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// Initialization
const app = express();


// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Route Defination
app.use('/api/v1', UserRouter)
app.use('/api/v1', ModelRouter)
app.use('/api/v1', BrandRouter)
app.use('/api/v1', ProductRouter)
app.use('/api/v1', VendorsRouter)
app.use('/api/v1', ProjectRouter)
app.use('/api/v1', AssetEntryRouter)
app.use('/api/v1', AssetTypesRouter)
app.use('/api/v1', ConditionsRouter)
app.use('/api/v1', DepreciatinRouter)
app.use('/api/v1', AssetCategoryRouter)
app.use('/api/v1', AssetSubCategoryRouter)


module.exports = app;