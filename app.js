// Imports
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const db = require('./config/db');
const express = require('express');
const cookieParser = require('cookie-parser');
const UserRouter = require('./routes/users');
const ModelRouter = require('./routes/model');
const BrandRouter = require('./routes/brands');
const StatusRouter = require('./routes/Status');
const ProductRouter = require('./routes/product');
const VendorsRouter = require('./routes/vendors');
const ProjectRouter = require('./routes/project');
const ModulesRouter = require('./routes/modules');
const UserRolesRouter = require('./routes/userRoles');
const LocationsRouter = require('./routes/locations');
const AssetEntryRouter = require('./routes/assetEntry');
const ConditionsRouter = require('./routes/conditions');
const AssetTypesRouter = require('./routes/assetTypes');
const AssetCategoryRouter = require('./routes/assetCategory');
const ComCategoryRouter = require('./routes/comCategory');
const ComplaintRouter = require('./routes/complaints');
const ComSubCategoryRouter = require('./routes/comSubCategory');
const ApprovalLevelRouter = require('./routes/approval_level');
const DepreciatinRouter = require('./routes/depreciationMethods');
const AssetSubCategoryRouter = require('./routes/assetSubCategory');
const UserAssociateRoleRouter = require('./routes/userAssociateRole');
const RequisitionMasterRouter = require('./routes/requisitionmaster');
const RequisitionApproveRouter = require('./routes/requisitionApprove');
const RequisitionDetailsRouter = require('./routes/requisitionDetails');
const LocationHierarchiesRouter = require('./routes/loc_hierarchies');
const DocumentCategory = require('./routes/document/document_category');
const DocumentSubCategory = require('./routes/document/document_sub_category');
const DocumentList = require('./routes/document/document_list');
const IndicatorCategory = require('./routes/mis/indicator_category');
const IndicatorSubCategory = require('./routes/mis/indicator_sub_category');


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
app.set('trust proxy',true);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public/vendor')));
app.use(express.static(path.join(__dirname, 'public/modules')));
app.use(express.static(path.join(__dirname, 'public/document')));


// Route Defination
app.use('/api/v1', UserRouter);
app.use('/api/v1', ModelRouter);
app.use('/api/v1', BrandRouter);
app.use('/api/v1', StatusRouter);
app.use('/api/v1', ProductRouter);
app.use('/api/v1', VendorsRouter);
app.use('/api/v1', ProjectRouter);
app.use('/api/v1', ModulesRouter);
app.use('/api/v1', LocationsRouter);
app.use('/api/v1', UserRolesRouter);
app.use('/api/v1', AssetEntryRouter);
app.use('/api/v1', ComCategoryRouter);
app.use('/api/v1', AssetTypesRouter);
app.use('/api/v1', ConditionsRouter);
app.use('/api/v1', ComplaintRouter);
app.use('/api/v1', DepreciatinRouter);
app.use('/api/v1', AssetCategoryRouter);
app.use('/api/v1', ApprovalLevelRouter);
app.use('/api/v1', ComSubCategoryRouter);
app.use('/api/v1', AssetSubCategoryRouter);
app.use('/api/v1', UserAssociateRoleRouter);
app.use('/api/v1', RequisitionMasterRouter);
app.use('/api/v1', RequisitionApproveRouter);
app.use('/api/v1', RequisitionDetailsRouter);
app.use('/api/v1', LocationHierarchiesRouter);
app.use('/api/v1/document/category', DocumentCategory);
app.use('/api/v1/document/sub/category', DocumentSubCategory);
app.use('/api/v1/document/list', DocumentList);
app.use('/api/v1/mis/indicator/category', IndicatorCategory);
app.use('/api/v1/mis/indicator/sub/category', IndicatorSubCategory);


module.exports = app;