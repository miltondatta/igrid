'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('document_lists', [
        {
          category_id: 1,
          sub_category_id: 1,
          content_type: 1,
          title: 'Examples index',
          circular_no: 1001,
          description: '<p>One of the best ways to learn how to do anything new (including software APIs!) is to get your hands dirty as quickly as possible. These examples will show you how to perform tasks ranging from something as simple as applying DataTables to an HTML table, right the way through to doing server-side processing with pipelining and custom plug-in functions.</p>',
          keyword: 'examples,index,ways,learn,including,software,apis,hands,dirty,quickly,show,perform,tasks,ranging,simple,applying,datatables,html,table,server-side,processing,pipelining,custom,plug-in,functions',
          file_name: 'igrid_document.pdf',
          document_date: new Date(),
          display_notice: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category_id: 1,
          sub_category_id: 2,
          content_type: 1,
          title: 'সংস্থা এবং কর্মকর্তা',
          circular_no: 1002,
          description: '<p>ডাটা এন্টি অপারেটরদিয়ে লগইন করার পর \নিয়ন্ত্রক তালিকা\ নামে একটি মেনুপাবেন।</p><p>সেখানথেকে পর্যায়ক্রমে নিমোক্ত সাবমেনু গুলো থেকে ডাটাইনপুট দিতে হবে ।</p>',
          keyword: 'সংস্থা,এবং,কর্মকর্তা,ডাটা,এন্টি,অপারেটরদিয়ে,লগইন,করার,পর,নিয়ন্ত্রক,তালিকা,নামে,একটি,মেনুপাবেন।সেখানথেকে,পর্যায়ক্রমে,নিমোক্ত,সাবমেনু,গুলো,থেকে,ডাটাইনপুট,দিতে,হবে,।',
          file_name: 'igrid_document.pdf',
          document_date: new Date(),
          display_notice: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category_id: 2,
          sub_category_id: 3,
          content_type: 1,
          title: 'Financial account',
          circular_no: 1003,
          description: '<p><strong>Finance</strong>: The Basics. The difference between <strong>finance and accounting</strong> is that <strong>accounting</strong> focuses on the day-to-day flow of money in and out of a company or institution, whereas <strong>finance</strong> is a</p>',
          keyword: 'financial,account,finance,basics,difference,accounting,focuses,day-to-day,flow,money,company,institution',
          file_name: 'igrid_document.pdf',
          document_date: new Date(),
          display_notice: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category_id: 2,
          sub_category_id: 4,
          content_type: 1,
          title: 'Finance vs Accounting',
          circular_no: 1004,
          description: '<p>This guide will analyze the key similarities and differences between finance vs accounting careers. For university graduates, these are two of the most common options, and each offers a rewarding career path for unique reasons.&nbsp;</p>',
          keyword: 'finance,accounting,guide,analyze,key,similarities,differences,careers,university,graduates,common,options,offers,rewarding,career,path,unique,reasons&nbsp',
          file_name: 'igrid_document.pdf',
          document_date: new Date(),
          display_notice: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category_id: 1,
          sub_category_id: 1,
          content_type: 2,
          title: 'Examples index',
          circular_no: 1005,
          description: '<p>One of the best ways to learn how to do anything new (including software APIs!) is to get your hands dirty as quickly as possible. These examples will show you how to perform tasks ranging from something as simple as applying DataTables to an HTML table, right the way through to doing server-side processing with pipelining and custom plug-in functions.</p>',
          keyword: 'examples,index,ways,learn,including,software,apis,hands,dirty,quickly,show,perform,tasks,ranging,simple,applying,datatables,html,table,server-side,processing,pipelining,custom,plug-in,functions',
          file_name: 'igrid_document.pdf',
          document_date: new Date(),
          display_notice: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category_id: 1,
          sub_category_id: 2,
          content_type: 2,
          title: 'সংস্থা এবং কর্মকর্তা',
          circular_no: 1006,
          description: '<p>ডাটা এন্টি অপারেটরদিয়ে লগইন করার পর \নিয়ন্ত্রক তালিকা\ নামে একটি মেনুপাবেন।</p><p>সেখানথেকে পর্যায়ক্রমে নিমোক্ত সাবমেনু গুলো থেকে ডাটাইনপুট দিতে হবে ।</p>',
          keyword: 'সংস্থা,এবং,কর্মকর্তা,ডাটা,এন্টি,অপারেটরদিয়ে,লগইন,করার,পর,নিয়ন্ত্রক,তালিকা,নামে,একটি,মেনুপাবেন।সেখানথেকে,পর্যায়ক্রমে,নিমোক্ত,সাবমেনু,গুলো,থেকে,ডাটাইনপুট,দিতে,হবে,।',
          file_name: 'igrid_document.pdf',
          document_date: new Date(),
          display_notice: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category_id: 2,
          sub_category_id: 3,
          content_type: 2,
          title: 'Financial account',
          circular_no: 1007,
          description: '<p><strong>Finance</strong>: The Basics. The difference between <strong>finance and accounting</strong> is that <strong>accounting</strong> focuses on the day-to-day flow of money in and out of a company or institution, whereas <strong>finance</strong> is a</p>',
          keyword: 'financial,account,finance,basics,difference,accounting,focuses,day-to-day,flow,money,company,institution',
          file_name: 'igrid_document.pdf',
          document_date: new Date(),
          display_notice: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category_id: 2,
          sub_category_id: 4,
          content_type: 2,
          title: 'Finance vs Accounting',
          circular_no: 1008,
          description: '<p>This guide will analyze the key similarities and differences between finance vs accounting careers. For university graduates, these are two of the most common options, and each offers a rewarding career path for unique reasons.&nbsp;</p>',
          keyword: 'finance,accounting,guide,analyze,key,similarities,differences,careers,university,graduates,common,options,offers,rewarding,career,path,unique,reasons&nbsp',
          file_name: 'igrid_document.pdf',
          document_date: new Date(),
          display_notice: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {

  }
};
