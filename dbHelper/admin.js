const db                    = require('../config/db')

const getMenuByParent = async (parent_id) => {
    const [menu_datas, metadata] = await db.query(`
        SELECT * FROM menus WHERE parent_id = ${parent_id}
    `);
    return menu_datas;
}; 

const getAllSubMenu = async () => {
    const [menu_datas, metadata] = await db.query(`
        SELECT * FROM menus WHERE parent_id > 0
    `);
    return menu_datas;
}; 

module.exports  = { 
    getMenuByParent, getAllSubMenu
 };