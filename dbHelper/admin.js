const db = require('../config/db');

const getMenuByParent = async (parent_id) => {
    const [menu_datas] = await db.query(`
        SELECT menus.*, modules.module_name
        FROM menus
        left join modules on menus.module_id = modules.id
        WHERE parent_id = ${parent_id}
    `);
    return menu_datas;
};

const getAllSubMenu = async () => {
    const [menu_datas] = await db.query(`
        SELECT * FROM menus WHERE parent_id > 0 ORDER BY order_by ASC
    `);
    return menu_datas;
};

module.exports = {
    getMenuByParent,
    getAllSubMenu
};