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
        id: 1,
        name: 'Homepage',
        icon: 'fas fa-home',
        link: '/',
        subCat: false,
    },
    {
        id: 2,
        name: 'Support History',
        icon: 'fas fa-ticket-alt',
        subCat: false,
        link: '/support-hisotry'
    },
    {
        id: 3,
        name: 'Material Requisition',
        icon: 'fas fa-keyboard',
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
            },
        ]
    },
    {
        id: 4,
        name: 'Requisition History',
        icon: 'fas fa-history',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Requisition Form',
                link: '/request-history',
                icon: "fas fa-satellite"
            },
            {
                id: 2,
                name: 'Branch Requisition',
                link: '/branch-requesition',
                icon: "far fa-keyboard"
            },
            {
                id: 3,
                name: 'Delivery Request',
                link: '/delivery-request',
                icon: "fab fa-500px"
            },
            {
                id: 4,
                name: 'Upazila Requisition',
                link: '',
                icon: "fab fa-ethereum"
            },
            {
                id: 5,
                name: 'Approval Log',
                link: '',
                icon: "fab fa-slack"
            },
            {
                id: 6,
                name: 'Region Request',
                link: '',
                icon: "far fa-snowflake"
            },
            {
                id: 7,
                name: 'Region Requisitions',
                link: '',
                icon: "fas fa-water"
            },
        ]
    },
    {
        id: 5,
        name: 'Inventory',
        icon: 'fas fa-warehouse',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Stock',
                link: '/challan',
                icon: ""
            },
            {
                id: 2,
                name: 'Delivery Report',
                link: '/branch-requesition',
                icon: ""
            },
            {
                id: 3,
                name: 'Delivery Receive',
                link: '/delivery-request',
                icon: ""
            },
            {
                id: 4,
                name: 'Lost Assets Information',
                link: '',
                icon: ""
            },
            {
                id: 5,
                name: 'Buffer Stock Management',
                link: '',
                icon: ""
            },
            {
                id: 6,
                name: 'SIM Management',
                link: '',
                icon: ""
            },
            {
                id: 7,
                name: 'TAB Management',
                link: '',
                icon: ""
            },
            {
                id: 8,
                name: 'Feedback',
                link: '',
                icon: ""
            },
            {
                id: 9,
                name: 'Asset Registration',
                link: '/stock-reg',
                icon: ""
            },
            {
                id: 10,
                name: 'Asset List',
                link: '/asset-list',
                icon: ""
            },
            {
                id: 11,
                name: 'Asset Dispose',
                link: '/asset-dispose',
                icon: ""
            },
            {
                id: 12,
                name: 'Asset Sale',
                link: '/asset-sale',
                icon: ""
            },
            {
                id: 13,
                name: 'Asset Re-Evaluation',
                link: '/asset-reevaluation',
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
        icon: 'fas fa-history',
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
            },
            {
                id: 3,
                name: 'Tab Summary Report',
                link: '/delivery-request',
                icon: ""
            },
            {
                id: 4,
                name: 'Monthly Stock',
                link: '',
                icon: ""
            }
        ]
    },
    {
        id: 7,
        name: 'User List',
        icon: 'fas fa-list-alt',
        subCat: false,
    },
    {
        id: 8,
        name: 'Complaint Group',
        icon: 'fas fa-object-group',
        subCat: true,
        categories: [
            {
                id: 1,
                name: 'Patch',
                link: '/request-history',
                icon: ""
            }
        ]
    },
    {
        id: 9,
        name: 'Admin',
        icon: 'fas fa-object-group',
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
                id: 7,
                name: 'Depreciation Methods',
                link: '/depreciation-methods',
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
                id: 10,
                name: 'Location Hierarchies',
                link: '/loc_hierarchies',
                icon: ""
            },
            {
                id: 11,
                name: 'Locations',
                link: '/assign-locations',
                icon: ""
            },
            {
                id: 12,
                name: 'User Roles',
                link: '/user-roles',
                icon: ""
            },
            {
                id: 13,
                name: 'Status',
                link: '/status',
                icon: ""
            },
            {
                id: 14,
                name: 'Modules',
                link: '/modules',
                icon: ""
            },
            {
                id: 15,
                name: 'User Associate Role',
                link: '/user-associate-role',
                icon: ""
            },
        ]
    },
    {
        id: 10,
        name: 'System Log',
        icon: 'fas fa-object-group',
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
]

export const requestOn = {
    1:'Hardware',
    2:'Accessories',
    3:'Stationary',
    4:'Others'
}

export const hardwareOptions = {
    1: 'Android Tab',
    2: 'Wireless Router',
    3: 'Modem (GP)',
    4: 'SIM (GP)',
    5: 'System Unit  (PC)',
    6: 'Monitor',
    7: 'UPS',
    8: 'Printer',
    9: 'Laptop',
    10: 'Smart Phone',
    11: 'Generator',
    12: 'Projector',
    13: 'Scanner',
    14: 'Printer Laser',
    15: 'IPS',
    16: 'AVR',
    17: 'Bag for Tab',
    18: 'Voltage Stabilizer',
}

export const stationaryOptions = {
    1: 'Ribbon',
    2: 'DVD RW',
    3: 'Key Board',
    4: 'Mouse',
    5: 'Power Cable',
    6: 'Printer Cable - Parallel',
    7: 'Power Strip',
    8: 'White Paper',
    9: 'Roll Paper',
    10:' Printer Cable - USB',
    11: 'TAB Cover',
}

export const accessoriesOptions = {
    1: 'Dust Blower',
    2: 'USB Cable',
    3: 'VGA Cable',
    4: 'Ink Bottle'
}

export const otherOptions = {
    1: 'Others',
}