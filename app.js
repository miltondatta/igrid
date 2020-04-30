// Imports
const path = require('path');
const cors = require('cors');
const http = require('http');
const helmet = require('helmet');
const logger = require('morgan');
const db = require('./config/db');
const express = require('express');
const socketIo = require("socket.io");
const debug = require('debug')('igrid:server');
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
const MisDashboardGraph = require('./routes/mis/dashboard_graph');
const MisImportCSVRouter = require('./routes/mis/import_csv');
const AssetCategoryRouter = require('./routes/assetCategory');
const ApprovalLevelRouter = require('./routes/approval_level');
const DocumentList = require('./routes/document/document_list');
const ComSubCategoryRouter = require('./routes/comSubCategory');
const TransferRequestRouter = require('./routes/transferRequest');
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
const ComplaintMapping = require('./routes/complaint_mapping');
const ComplaintFeedback = require('./routes/complaint_feedback');
const ComplaintForward = require('./routes/complaint_forward');
const AssetLifeCycle   = require('./routes/asset_life_cycle');


// Database Connection
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


// Initialization
let incomingAssetRequest = [];
const port = normalizePort(process.env.PORT || '5000');
const app = express();
app.set('port', port);
const server = http.createServer(app);
const io = socketIo(server);

// Socket Setup
io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('transferRequestSubmit', (data) => {
        incomingAssetRequest = data.request_to
        assetTransferEmit()
    })

    socket.on('requestChecked', (data) => {
        incomingAssetRequest.forEach((item, index) => {
            if (index === data.index) {
                item.status = false
            }
        })
        assetTransferEmit()
    })

    assetTransferEmit()

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const assetTransferEmit = () => {
    io.emit('incomingTransferRequest' , incomingAssetRequest)
}

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
app.use(express.static(path.join(__dirname, 'public/complaints')));
app.use(express.static(path.join(__dirname, 'public/repair-assets')));
app.use(express.static(path.join(__dirname, 'public/complaint_feedbacks')));


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
app.use('/api/v1', LostAssetsRouter);
app.use('/api/v1', DepreciatinRouter);
app.use('/api/v1', MisDashboardRouter);
app.use('/api/v1', AssetCategoryRouter);
app.use('/api/v1', ApprovalLevelRouter);
app.use('/api/v1', ComSubCategoryRouter);
app.use('/api/v1', TransferRequestRouter);
app.use('/api/v1', AssetSubCategoryRouter);
app.use('/api/v1', UserAssociateRoleRouter);
app.use('/api/v1', MenuAssign);
app.use('/api/v1', MenuSubMenu);
app.use('/api/v1', MisBasicReport);
app.use('/api/v1', MisDashboardGraph);
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
app.use('/api/v1/', ComplaintRouter);
app.use('/api/v1/complaint/mapping', ComplaintMapping);
app.use('/api/v1/complaint/feedback', ComplaintFeedback);
app.use('/api/v1/complaint/forward', ComplaintForward);
app.use('/api/v1/', AssetLifeCycle);



function normalizePort(val){
    let port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}
function onError (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening () {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = app;
