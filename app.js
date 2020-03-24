// Imports
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const db = require('./config/db');
const express = require('express');
const cookieParser = require('cookie-parser');

// Routes
const UserRouter = require('./routes/users');
const MenuSubMenu = require('./routes/menu');
const ModelRouter = require('./routes/model');
const BrandRouter = require('./routes/brands');
const StatusRouter = require('./routes/status');
const ProductRouter = require('./routes/product');
const VendorsRouter = require('./routes/vendors');
const ProjectRouter = require('./routes/project');
const ModulesRouter = require('./routes/modules');
const MenuAssign = require('./routes/menu-assign');
const ContactsRouter = require('./routes/contacts');
const AssetRepair = require('./routes/asset-repair');
const AmpTypesRouter = require('./routes/amc_types');
const UserRolesRouter = require('./routes/userRoles');
const LocationsRouter = require('./routes/locations');
const ComplaintRouter = require('./routes/complaints');
const AssetEntryRouter = require('./routes/assetEntry');
const ConditionsRouter = require('./routes/conditions');
const AssetTypesRouter = require('./routes/assetTypes');
const LostAssetsRouter = require('./routes/lostAssets');
const ComCategoryRouter = require('./routes/comCategory');
const MisBasicReport = require('./routes/mis/basic_report');
const MisImportCSVRouter = require('./routes/mis/import_csv');
const AssetCategoryRouter = require('./routes/assetCategory');
const ApprovalLevelRouter = require('./routes/approval_level');
const DocumentList = require('./routes/document/document_list');
const ComSubCategoryRouter = require('./routes/comSubCategory');
const MisDashboardRouter = require('./routes/mis/mis_dashboard');
const DepreciatinRouter = require('./routes/depreciationMethods');
const AssetSubCategoryRouter = require('./routes/assetSubCategory');
const IndicatorCategory = require('./routes/mis/indicator_category');
const UserAssociateRoleRouter = require('./routes/userAssociateRole');
const LocationHierarchiesRouter = require('./routes/loc_hierarchies');
const RequisitionMasterRouter = require('./routes/requisitionmaster');
const RequisitionApproveRouter = require('./routes/requisitionApprove');
const RequisitionDetailsRouter = require('./routes/requisitionDetails');
const DocumentCategory = require('./routes/document/document_category');
const IndicatorSubCategory = require('./routes/mis/indicator_sub_category');
const DocumentSubCategory = require('./routes/document/document_sub_category');


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
app.set('trust proxy', true);
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public/vendor')));
app.use(express.static(path.join(__dirname, 'public/modules')));
app.use(express.static(path.join(__dirname, 'public/document')));
app.use(express.static(path.join(__dirname, 'public/repair-assets')));


// Route Defination
app.use('/api/v1', ContactsRouter);
app.use('/api/v1', UserRouter);
app.use('/api/v1', ModelRouter);
app.use('/api/v1', BrandRouter);
app.use('/api/v1', StatusRouter);
app.use('/api/v1', ProductRouter);
app.use('/api/v1', VendorsRouter);
app.use('/api/v1', ProjectRouter);
app.use('/api/v1', ModulesRouter);
app.use('/api/v1', AmpTypesRouter);
app.use('/api/v1', LocationsRouter);
app.use('/api/v1', UserRolesRouter);
app.use('/api/v1', AssetEntryRouter);
app.use('/api/v1', ComCategoryRouter);
app.use('/api/v1', AssetTypesRouter);
app.use('/api/v1', ConditionsRouter);
app.use('/api/v1', ComplaintRouter);
app.use('/api/v1', LostAssetsRouter);
app.use('/api/v1', DepreciatinRouter);
app.use('/api/v1', MisDashboardRouter);
app.use('/api/v1', AssetCategoryRouter);
app.use('/api/v1', ApprovalLevelRouter);
app.use('/api/v1', ComSubCategoryRouter);
app.use('/api/v1', AssetSubCategoryRouter);
app.use('/api/v1', UserAssociateRoleRouter);
app.use('/api/v1', MenuAssign);
app.use('/api/v1', MenuSubMenu);
app.use('/api/v1', MisBasicReport);
app.use('/api/v1', MisImportCSVRouter);
app.use('/api/v1', RequisitionMasterRouter);
app.use('/api/v1', RequisitionApproveRouter);
app.use('/api/v1', RequisitionDetailsRouter);
app.use('/api/v1', LocationHierarchiesRouter);
app.use('/api/v1/document/list', DocumentList);
app.use('/api/v1/document/category', DocumentCategory);
app.use('/api/v1/document/sub/category', DocumentSubCategory);
app.use('/api/v1/mis/indicator/category', IndicatorCategory);
app.use('/api/v1/mis/indicator/sub/category', IndicatorSubCategory);
app.use('/api/v1/asset-repair', AssetRepair);


module.exports = app;