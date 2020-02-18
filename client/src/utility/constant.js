const devBaseUrl = 'http://localhost:5000/api/v1/'
const prodBaseUrl = 'http://localhost:5000/api/v1/'

export const apiUrl = () => {
    if(process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return devBaseUrl
    } else {
        return prodBaseUrl
    }
}

export const sidenav = [
    {
        id: 3,
        name: 'Material Requisition',
        icon: 'icofont-file-document',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Hardware',
                link: '/asset/1',
                icon: "fas fa-satellite"
            },
            {
                id: 2,
                name: 'Accessories',
                link: '/asset/2',
                icon: "far fa-keyboard"
            },
            {
                id: 3,
                name: 'Stationary',
                link: '/asset/3',
                icon: "fab fa-500px"
            },
            {
                id: 4,
                name: 'Others',
                link: '/asset/4',
                icon: "fab fa-ethereum"
            }
        ]
    },
    {
        id: 4,
        name: 'Requisition',
        icon: 'fas fa-history',
        subCat: true,
        categories: [
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
                name: 'Approved Delivery',
                link: '/approved-delivery',
                icon: "far fa-keyboard"
            }
        ]
    },
    {
        id: 5,
        name: 'Inventory',
        icon: 'fas fa-chart-pie',
        subCat: true,
        categories: [
            {
                id: 9,
                name: 'Asset Registration',
                link: '/stock-reg',
                icon: ""
            },
            {
                id: 1,
                name: 'Stock',
                link: '/challan',
                icon: ""
            },
            {
                id: 4,
                name: 'Lost Assets Information',
                link: '',
                icon: ""
            },
            {
                id: 11,
                name: 'Asset Dispose',
                link: '/asset-dispose',
                icon: ""
            },
            {
                id: 14,
                name: 'Asset Transfer',
                link: '/asset-transfer',
                icon: ""
            },
            {
                id: 15,
                name: 'Repair & Maintenance',
                link: '/asset-repair',
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
                id: 1,
                name: 'Delivery Report',
                link: '/request-history',
                icon: ""
            },
            {
                id: 2,
                name: 'Stock Report',
                link: '/branch-requesition',
                icon: ""
            }
        ]
    },
    {
        id: 9,
        name: 'Admin',
        icon: 'fas fa-user-shield',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Project',
                link: '/project',
                icon: ""
            },
            {
                id: 2,
                name: 'Vendor',
                link: '/vendor',
                icon: ""
            },
            {
                id: 3,
                name: 'Models',
                link: '/model',
                icon: ""
            },
            {
                id: 4,
                name: 'Brands',
                link: '/brand',
                icon: ""
            },
            {
                id: 5,
                name: 'Asset Category',
                link: '/asset-category',
                icon: ""
            },
            {
                id: 5,
                name: 'Asset Sub Category',
                link: '/asset-sub-category',
                icon: ""
            },
            {
                id: 6,
                name: 'Product',
                link: '/product',
                icon: ""
            },
            {
                id: 8,
                name: 'Asset Types',
                link: '/asset-types',
                icon: ""
            },
            {
                id: 9,
                name: 'Conditions',
                link: '/conditions',
                icon: ""
            },
            {
                id: 11,
                name: 'Locations',
                link: '/assign-locations',
                icon: ""
            },
            {
                id: 15,
                name: 'User Associate Role',
                link: '/user-associate-role',
                icon: ""
            },
            {
                id: 16,
                name: 'Register User',
                link: '/register-user',
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
                link: '/user-login-log',
                icon: ""
            }
        ]
    },
    {
        id: 10,
        name: 'Config',
        icon: 'icofont-ui-settings',
        subCat: true,
        categories: [
            {
                id: 14,
                name: 'Modules',
                link: '/modules',
                icon: ""
            },
            {
                id: 12,
                name: 'User Roles',
                link: '/user-roles',
                icon: ""
            },
            {
                id: 10,
                name: 'Location Hierarchies',
                link: '/loc_hierarchies',
                icon: ""
            },
            {
                id: 13,
                name: 'Status',
                link: '/status',
                icon: ""
            },
            {
                id: 17,
                name: 'Approval Level',
                link: '/approval-level',
                icon: ""
            },
            {
                id: 7,
                name: 'Depreciation Methods',
                link: '/depreciation-methods',
                icon: ""
            },
        ]
    },
    {
        id: 11,
        name: 'Document Management',
        icon: 'fas fa-object-group',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Document Category',
                link: '/document-category',
                icon: ""
            },
            {
                id: 1,
                name: 'Document Sub Category',
                link: '/document-sub-category',
                icon: ""
            },
            {
                id: 1,
                name: 'Document List',
                link: '/document-list',
                icon: ""
            }
        ]
    },
]