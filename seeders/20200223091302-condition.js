'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('conditions', [{
        condition_type: 'New',
        description: 'Perfect condition, never used. Unless otherwise stated, our items are sold new.',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        condition_type: 'OEM',
        description: 'Original equipment manufacturer, It is a new item (as defined above), but is in a brown non-retail box.',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        condition_type: 'New Open Box',
        description: 'These products have never been used, the only difference between the "New" and "New Open Box" is that the outside factory seal has been broken.',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        condition_type: 'Generic - 3rd Party',
        description: 'It is a new item (as defined above), but is a generic version manufactured by a separate manufacturer.',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        condition_type: 'Refurbished',
        description: 'Refurbished typically means that the customer returned the item for reasons other than being defective (e.g. a customer may have changed his or her mind, did not like the product',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        condition_type: 'Used - Like New',
        description: 'Item has never been used. It looks and functions identical to a New item (as defined above), but for some reason this item does not qualify as New.',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        condition_type: 'Used - Very Good',
        description: 'Item looks and functions as if it were new, but may have light marks or scratches. Accessories, manuals, cables and software may not be included with the item. Please see item description for package contents.',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        condition_type: 'Used - Good',
        description: 'Item works as new. Minimal cosmetic damage to product. Some wear and tear but not excessive. Some non-basic components may be missing. Please see item description for package contents.',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        condition_type: 'Used - Acceptable',
        description: 'The most important functions of the item work as new. Functions that do not work should be described in detail in the description. May have some damage; some non-basic components may be missing.',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        condition_type: 'As Is',
        description: 'Item is being sold "as is." We have not inspected the item in any way and make no guarantees about its condition. All sales final. No returns on as is items.',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('conditions', null, {});
  }
};
