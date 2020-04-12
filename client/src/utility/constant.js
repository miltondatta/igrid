import {devBaseUrl, prodBaseUrl, BackEnd_BaseUrl} from "../config/private";
import React from "react";
export const apiBaseUrl =  BackEnd_BaseUrl;

export const apiUrl = () => {
    if(process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return devBaseUrl
    } else {
        return prodBaseUrl
    }
};

export const sidenav = [
    {
        id: 4,
        name: 'Requisition',
        icon: 'fas fa-history',
        subCat: true,
        categories: [
            {
                id: 4,
                name: 'New Requisition',
                link: '/requisition',
                icon: "far fa-keyboard"
            },
            {
                id: 5,
                name: 'My Requisition Status',
                link: '/requisition-status',
                icon: "far fa-keyboard"
            },
            {
                id: 1,
                name: 'Requisition List',
                link: '/request-history',
                icon: "fas fa-satellite"
            },
            {
                id: 2,
                name: 'Delivery Request',
                link: '/delivery-request',
                icon: "fab fa-500px"
            },
            {
                id: 3,
                name: 'My Delivery',
                link: '/approved-delivery',
                icon: "far fa-keyboard"
            },
            {
                id: 6,
                name: 'Delivery Received',
                link: '/delivery-received',
                icon: "far fa-keyboard"
            },
        ]
    },
    {
        id: 5,
        name: 'Asset',
        icon: 'fas fa-chart-pie',
        subCat: true,
        categories: [
            {
                id: 9,
                name: 'New Asset Registration',
                link: '/stock-reg',
                icon: ""
            },
            {
                id: 1,
                name: 'Open Challan List',
                link: '/challan',
                icon: ""
            },
            {
                id: 2,
                name: 'Own Stock',
                link: '/own-stock',
                icon: ""
            },
            {
                id: 17,
                name: 'Asset Details',
                link: '/asset-details',
                icon: ""
            },
            {
                id: 14,
                name: 'Asset Transfer',
                link: '/asset-transfer',
                icon: ""
            },
            {
                id: 11,
                name: 'Asset Disposal',
                link: '/asset-disposal',
                icon: ""
            },
            {
                id: 12,
                name: 'Disposal Asset List',
                link: '/asset-disposal-list',
                icon: ""
            },
            {
                id: 3,
                name: 'Lost Assets Information',
                link: '/lost-assets',
                icon: ""
            },
            {
                id: 4,
                name: 'Lost Assets Status',
                link: '/lost-assets-status',
                icon: ""
            },
            {
                id: 15,
                name: 'Repair & Maintenance',
                link: '/asset-repair',
                icon: ""
            },
            {
                id: 16,
                name: 'Repair & Maintenance List',
                link: '/asset-repair-list',
                icon: ""
            },
        ]
    },
    {
        id: 6,
        name: 'Report',
        icon: 'icofont-chart-histogram',
        subCat: true,
        categories: [
            {
                id: 5,
                name: 'Stock Report',
                link: '/stock-report',
                icon: ""
            },
            {
                id: 1,
                name: 'Delivery Report',
                link: '/delivery-report',
                icon: ""
            },
            {
                id: 2,
                name: 'Lost Assets Report',
                link: '/lost-assets-report',
                icon: ""
            },
            {
                id: 3,
                name: 'Asset Disposal Report',
                link: '/asset-disposal-report',
                icon: ""
            },
            {
                id: 4,
                name: 'Maintenance Report',
                link: '/maintenance-report',
                icon: ""
            }
        ]
    },
    {
        id: 8,
        name: 'Complaints',
        icon: 'fas fa-book-dead',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'New Complaint',
                link: '/complaint',
                icon: ""
            },
            {
                id: 2,
                name: 'My Complaint Status',
                link: '/my-complaint-status',
                icon: ""
            },
            {
                id: 3,
                name: 'Assign Complaint',
                link: '/assign-complaint',
                icon: ""
            },
            {
                id: 4,
                name: 'Complaint Report',
                link: '/complaint-report',
                icon: ""
            }
        ]
    },
]

export const systemAdmin = [
    {
        id: 10,
        name: 'System Configuration',
        icon: 'icofont-ui-settings',
        subCat: true,
        categories: [
            {
                id: 14,
                name: 'Modules',
                link: '/admin/modules',
                icon: ""
            },
            {
                id: 12,
                name: 'User Roles',
                link: '/admin/user-roles',
                icon: ""
            },
            {
                id: 10,
                name: 'Location Hierarchies',
                link: '/admin/loc_hierarchies',
                icon: ""
            },
            {
                id: 17,
                name: 'Approval Level',
                link: '/admin/approval-level',
                icon: ""
            },
            {
                id: 16,
                name: 'Register User',
                link: '/admin/register-user',
                icon: ""
            },
            {
                id: 15,
                name: 'Assign User Role ',
                link: '/admin/user-associate-role',
                icon: ""
            },
            {
                id: 7,
                name: 'Depreciation Methods',
                link: '/admin/depreciation-methods',
                icon: ""
            },
            {
                id: 8,
                name: 'Menu',
                link: '/admin/menu',
                icon: ""
            },
            {
                id: 8,
                name: 'Menu Assign',
                link: '/admin/menu/assign',
                icon: ""
            }
        ]
    },
    {
        id: 9,
        name: 'Asset Configuration',
        icon: 'fas fa-user-shield',
        subCat: true,
        categories: [
            {
                id: 5,
                name: 'Asset Category',
                link: '/admin/asset-category',
                icon: ""
            },
            {
                id: 5,
                name: 'Asset Sub Category',
                link: '/admin/asset-sub-category',
                icon: ""
            },
            {
                id: 1,
                name: 'Project',
                link: '/admin/project',
                icon: ""
            },
            {
                id: 2,
                name: 'Vendor',
                link: '/admin/vendor',
                icon: ""
            },
            {
                id: 4,
                name: 'Brands',
                link: '/admin/brand',
                icon: ""
            },
            {
                id: 3,
                name: 'Models',
                link: '/admin/model',
                icon: ""
            },
            {
                id: 6,
                name: 'Product',
                link: '/admin/product',
                icon: ""
            },
            {
                id: 8,
                name: 'Asset Types',
                link: '/admin/asset-types',
                icon: ""
            },
            {
                id: 9,
                name: 'Conditions',
                link: '/admin/conditions',
                icon: ""
            },
            {
                id: 11,
                name: 'Locations',
                link: '/admin/assign-locations',
                icon: ""
            },
            {
                id: 17,
                name: 'AMC Types',
                link: '/admin/amc-types',
                icon: ""
            },
        ]
    },
    {
        id: 7,
        name: 'MIS Configuration',
        icon: 'fas fa-reply-all',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Indicator Category',
                link: '/admin/mis/indicator/category',
                icon: ""
            },
            {
                id: 2,
                name: 'Indicator List',
                link: '/admin/mis/indicator/list',
                icon: ""
            },
            {
                id: 3,
                name: 'Import CSV Data',
                link: '/admin/mis/import/csv',
                icon: ""
            },
        ]
    },
    {
        id: 10,
        name: 'Log',
        icon: 'icofont-ui-note',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'User Login',
                link: '/admin/user-login-log',
                icon: ""
            }
        ]
    },
    {
        id: 11,
        name: 'Complaints',
        icon: 'fas fa-book-dead',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Complaint Category',
                link: '/admin/complain-category',
                icon: ""
            },
            {
                id: 2,
                name: 'Complaint Sub Category',
                link: '/admin/complain-sub-category',
                icon: ""
            },
            {
                id: 3,
                name: 'Complaint Mapping',
                link: '/admin/complaint-mapping',
                icon: ""
            }
        ]
    },
    {
        id: 20,
        name: 'Report',
        icon: 'icofont-chart-histogram',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Delivery Report (All)',
                link: '/admin/delivery-report/all',
                icon: ""
            },
            {
                id: 2,
                name: 'Assets Report (All)',
                link: '/admin/asset-report/all',
                icon: ""
            },
        ]
    },
];

export const locationCategory = [
    {
        id: 10,
        name: 'All Branches',
        icon: 'fab fa-fort-awesome',
        subCat: false,
        link: '/location'
    },
    {
        id: 9,
        name: 'Detailed Location',
        icon: 'fas fa-map-marked-alt',
        subCat: false,
        link: '/location/details'
    },
];

export const misCategory = [
    {
        id: 10,
        name: 'Dashboard',
        icon: 'fab fa-fort-awesome',
        subCat: false,
        link: '/mis/dashboard'
    },
    {
        id: 12,
        name: 'Extended Dashboard',
        icon: 'fas fa-tachometer-alt',
        subCat: false,
        link: '/mis/extended-dashboard'
    },
    {
        id: 11,
        name: 'Basic Reports',
        icon: 'fas fa-map-marked-alt',
        subCat: true,
        categories: [
            {
                id: 3,
                name: 'Daily',
                link: '/mis/daily-report',
                icon: ""
            },
            {
                id: 1,
                name: 'Weekly',
                link: '/mis/weekly-report',
                icon: ""
            },
            {
                id: 4,
                name: 'Monthly',
                link: '/mis/monthly-report',
                icon: ""
            }
        ]
    },
];

export const profileCategory = [
    {
        id: 31,
        name: 'Profile',
        icon: 'fab fa-fort-awesome',
        subCat: false,
        link: '/profile'
    },
    {
        id: 32,
        name: 'Update Password',
        icon: 'fab fa-fort-awesome',
        subCat: false,
        link: '/profile/pass-reset'
    },
    {
        id: 33,
        name: 'Settings',
        icon: 'fab fa-fort-awesome',
        subCat: false,
        link: '/admin/user-login-log'
    },
    {
        id: 34,
        name: 'Logout',
        icon: 'fab fa-fort-awesome',
        subCat: false,
        link: '/'
    },
];

export const documentNav = [
    {
        id: 11,
        name: 'Advance Search',
        link: '/documents/document-list-search',
        icon: "fas fa-search"
    },
    {
        id: 12,
        name: 'Document',
        icon: 'far fa-file',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Category',
                link: '/documents/document-category',
                icon: ""
            },
            {
                id: 2,
                name: 'Sub Category',
                link: '/documents/document-sub-category',
                icon: ""
            },
            {
                id: 3,
                name: 'New Document/Circular',
                link: '/documents/document-list',
                icon: ""
            }
        ]
    }
];

export const homeBanner = [
    {
        title: "Manage Your Business Easily",
        btnText: "MIS Report",
        link: "/",
        img: "/media/banner/b_1.png"
    },
    {
        title: "Manage Your Asset quickly",
        btnText: "Asset Requisition & Tracking",
        link: "/asset-dashboard",
        img: "/media/banner/b_2.png"
    },
    {
        title: "Manage Your Documents Easily",
        btnText: "Document Management",
        link: "/document-list-search",
        img: "/media/banner/b_3.png"
    },
    {
        title: "Find your Locations",
        btnText: "Location Finder",
        link: "/location",
        img: "/media/banner/b_4.png"
    },
];

export const colorHolder = [
    ['#fff2e6','#ffe6cc','#ffd9b3','#ffcc99','#ffbf80','#ffb366','#ffa64d','#ff9933','#ff8c1a','#ff8000','#e67300','#cc6600', '#fff2e6','#ffe6cc','#ffd9b3','#ffcc99','#ffbf80','#ffb366','#ffa64d','#ff9933','#ff8c1a','#ff8000','#e67300','#cc6600', '#fff2e6','#ffe6cc','#ffd9b3','#ffcc99','#ffbf80','#ffb366','#ffa64d','#ff9933','#ff8c1a','#ff8000','#e67300','#cc6600'],
    ['#cce6ff','#b3d9ff','#b3d9ff','#80bfff','#66b3ff','#4da6ff','#3399ff','#1a8cff','#0080ff','#0073e6','#0066cc','#0059b3', '#cce6ff','#b3d9ff','#b3d9ff','#80bfff','#66b3ff','#4da6ff','#3399ff','#1a8cff','#0080ff','#0073e6','#0066cc','#0059b3', '#cce6ff','#b3d9ff','#b3d9ff','#80bfff','#66b3ff','#4da6ff','#3399ff','#1a8cff','#0080ff','#0073e6','#0066cc','#0059b3'],
    ['#ffe6ff','#ffccff','#ffb3ff','#ff99ff','#ff80ff','#ff66ff','#ff4dff','#ff33ff','#ff1aff','#ff00ff','#e600e6','#cc00cc', '#ffe6ff','#ffccff','#ffb3ff','#ff99ff','#ff80ff','#ff66ff','#ff4dff','#ff33ff','#ff1aff','#ff00ff','#e600e6','#cc00cc', '#ffe6ff','#ffccff','#ffb3ff','#ff99ff','#ff80ff','#ff66ff','#ff4dff','#ff33ff','#ff1aff','#ff00ff','#e600e6','#cc00cc'],
    ["#ffe6f2","#ffcce6","#ffb3d9","#ff99cc","#ff80bf","#ff66b3","#ff4da6","#ff3399","#ff1a8c","#ff0080","#e60073","#cc0066", "#ffe6f2","#ffcce6","#ffb3d9","#ff99cc","#ff80bf","#ff66b3","#ff4da6","#ff3399","#ff1a8c","#ff0080","#e60073","#cc0066", "#ffe6f2","#ffcce6","#ffb3d9","#ff99cc","#ff80bf","#ff66b3","#ff4da6","#ff3399","#ff1a8c","#ff0080","#e60073","#cc0066"],
    ["#e6faff","#ccf5ff","#b3f0ff","#99ebff","#80e5ff","#66e0ff","#4ddbff","#33d6ff","#1ad1ff","#00ccff","#00b8e6","#00a3cc", "#e6faff","#ccf5ff","#b3f0ff","#99ebff","#80e5ff","#66e0ff","#4ddbff","#33d6ff","#1ad1ff","#00ccff","#00b8e6","#00a3cc", "#e6faff","#ccf5ff","#b3f0ff","#99ebff","#80e5ff","#66e0ff","#4ddbff","#33d6ff","#1ad1ff","#00ccff","#00b8e6","#00a3cc"],
    ["#f9ecec","#f2d9d9","#ecc6c6","#e6b3b3","#df9f9f","#d98c8c","#d27979","#cc6666","#c65353","#bf4040","#ac3939","#993333", "#f9ecec","#f2d9d9","#ecc6c6","#e6b3b3","#df9f9f","#d98c8c","#d27979","#cc6666","#c65353","#bf4040","#ac3939","#993333", "#f9ecec","#f2d9d9","#ecc6c6","#e6b3b3","#df9f9f","#d98c8c","#d27979","#cc6666","#c65353","#bf4040","#ac3939","#993333"],
    ["#f9f2ec","#f2e6d9","#ecd9c6","#e6ccb3","#dfbf9f","#d9b38c","#d2a679","#cc9966","#c68c53","#bf8040","#ac7339","#996633", "#f9f2ec","#f2e6d9","#ecd9c6","#e6ccb3","#dfbf9f","#d9b38c","#d2a679","#cc9966","#c68c53","#bf8040","#ac7339","#996633", "#f9f2ec","#f2e6d9","#ecd9c6","#e6ccb3","#dfbf9f","#d9b38c","#d2a679","#cc9966","#c68c53","#bf8040","#ac7339","#996633"],
    ["#f7e6ff","#eeccff","#e6b3ff","#dd99ff","#d580ff","#cc66ff","#c44dff","#bb33ff","#b31aff","#aa00ff","#9900e6","#8800cc", "#f7e6ff","#eeccff","#e6b3ff","#dd99ff","#d580ff","#cc66ff","#c44dff","#bb33ff","#b31aff","#aa00ff","#9900e6","#8800cc", "#f7e6ff","#eeccff","#e6b3ff","#dd99ff","#d580ff","#cc66ff","#c44dff","#bb33ff","#b31aff","#aa00ff","#9900e6","#8800cc"],
]

export const singleColor = ['#ffcc99','#80bfff','#ff99ff',"#ff99cc","#99ebff","#e6b3b3","#e6ccb3","#dd99ff", '#ff8c1a','#0080ff','#ff1aff',"#ff1a8c","#1ad1ff","#c65353","#c68c53","#b31aff", '#ffcc99','#80bfff','#ff99ff',"#ff99cc","#99ebff","#e6b3b3","#e6ccb3","#dd99ff", '#ff8c1a','#0080ff','#ff1aff',"#ff1a8c","#1ad1ff","#c65353","#c68c53","#b31aff"]