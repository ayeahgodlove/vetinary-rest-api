'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "review"
 * createTable "quiz", deps: []
 * createTable "product_review", deps: [product, user]
 * createTable "course", deps: [user]
 * createTable "lesson", deps: [user]
 * createTable "enrollment", deps: [user, course]
 * createTable "lesson_review", deps: [lesson, user]
 *
 **/

const info = {
    "revision": 7,
    "name": "init-migrations",
    "created": "2023-11-25T07:49:40.808Z",
    "comment": ""
};

const migrationCommands = [

    {
        fn: "createTable",
        params: [
            "SequelizeMigrationsMeta",
            {
                "revision": {
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "state": {
                    "allowNull": false,
                    "type": Sequelize.JSON
                },
            },
            {}
        ]
    },
    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision
            }],
            {}
        ]
    },
    {
        fn: "bulkInsert",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
                name: info.name,
                state: '{"revision":7,"tables":{"category":{"tableName":"category","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"subCategory":{"tableName":"subCategory","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"tag":{"tableName":"tag","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user":{"tableName":"user","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"authStrategy":{"seqType":"Sequelize.STRING(10)","allowNull":false},"firstname":{"seqType":"Sequelize.STRING(50)","allowNull":true},"lastname":{"seqType":"Sequelize.STRING(50)","allowNull":true},"username":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"avatar":{"seqType":"Sequelize.STRING(255)","allowNull":true},"email":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"phoneNumber":{"seqType":"Sequelize.STRING(13)"},"city":{"seqType":"Sequelize.STRING(30)","allowNull":true},"country":{"seqType":"Sequelize.STRING(30)","allowNull":true},"address":{"seqType":"Sequelize.STRING(255)","allowNull":true},"password":{"seqType":"Sequelize.STRING(255)","allowNull":true,"unique":true},"verified":{"seqType":"Sequelize.BOOLEAN"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"role":{"tableName":"role","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user-role":{"tableName":"user-role","schema":{"userId":{"seqType":"Sequelize.STRING(50)","unique":"user-role_roleId_userId_unique","primaryKey":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"roleId":{"seqType":"Sequelize.STRING(20)","unique":"user-role_roleId_userId_unique","primaryKey":true,"references":{"model":"role","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"post":{"tableName":"post","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(128)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"content":{"seqType":"Sequelize.TEXT","allowNull":false},"imageUrl":{"seqType":"Sequelize.STRING(128)","allowNull":false},"publishedAt":{"seqType":"Sequelize.DATE"},"authorId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"categoryId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"category","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"document":{"tableName":"document","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(128)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"fileUrl":{"seqType":"Sequelize.STRING(128)","allowNull":false},"uploadDate":{"seqType":"Sequelize.DATE","allowNull":false},"userId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"categoryId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"category","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"comment":{"tableName":"comment","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"content":{"seqType":"Sequelize.TEXT","allowNull":false},"userId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"postId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"post","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"publishedAt":{"seqType":"Sequelize.DATE"},"parent_id":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"comment","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"postTag":{"tableName":"postTag","schema":{"postId":{"seqType":"Sequelize.STRING(20)","unique":"postTag_postId_tagId_unique","primaryKey":true,"references":{"model":"post","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"tagId":{"seqType":"Sequelize.STRING(20)","unique":"postTag_postId_tagId_unique","primaryKey":true,"references":{"model":"tag","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"documentTag":{"tableName":"documentTag","schema":{"documentId":{"seqType":"Sequelize.STRING(20)","unique":"documentTag_documentId_tagId_unique","primaryKey":true,"references":{"model":"document","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"tagId":{"seqType":"Sequelize.STRING(20)","unique":"documentTag_documentId_tagId_unique","primaryKey":true,"references":{"model":"tag","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user_doc":{"tableName":"user_doc","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"scannedIdCard":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"scannedLiscence":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"branch":{"tableName":"branch","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"storeId":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"store","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"town":{"seqType":"Sequelize.STRING(128)","allowNull":false},"address":{"seqType":"Sequelize.STRING(255)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"store":{"tableName":"store","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(128)","allowNull":false},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"location":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":false},"imageBannerUrl":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"product":{"tableName":"product","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"categoryId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"category","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"storeId":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"store","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"amount":{"seqType":"Sequelize.DECIMAL","allowNull":false,"unique":false},"shortDescription":{"seqType":"Sequelize.TEXT","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false,"unique":true},"qtty":{"seqType":"Sequelize.DECIMAL","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"product_image":{"tableName":"product_image","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"productId":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"product","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"productName":{"seqType":"Sequelize.STRING(255)","allowNull":false},"imageUrl":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"productTag":{"tableName":"productTag","schema":{"productId":{"seqType":"Sequelize.STRING(20)","unique":"productTag_productId_tagId_unique","primaryKey":true,"references":{"model":"product","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"tagId":{"seqType":"Sequelize.STRING(20)","unique":"productTag_productId_tagId_unique","primaryKey":true,"references":{"model":"tag","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user-store":{"tableName":"user-store","schema":{"userId":{"seqType":"Sequelize.STRING(50)","unique":"user-store_storeId_userId_unique","primaryKey":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"storeId":{"seqType":"Sequelize.STRING(20)","unique":"user-store_storeId_userId_unique","primaryKey":true,"references":{"model":"store","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"product_review":{"tableName":"product_review","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"productId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"product","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"comment":{"seqType":"Sequelize.TEXT","allowNull":false},"rating":{"seqType":"Sequelize.INTEGER","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"banner":{"tableName":"banner","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"subTitle":{"seqType":"Sequelize.TEXT","allowNull":false},"image":{"seqType":"Sequelize.STRING(255)","allowNull":false},"userId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"order":{"tableName":"order","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":true},"totalQtty":{"seqType":"Sequelize.INTEGER","allowNull":false},"totalAmount":{"seqType":"Sequelize.DECIMAL","allowNull":false},"orderNo":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"username":{"seqType":"Sequelize.STRING(255)","allowNull":false},"address":{"seqType":"Sequelize.STRING(255)","allowNull":false},"email":{"seqType":"Sequelize.STRING(255)","allowNull":false},"cellPhone":{"seqType":"Sequelize.STRING(255)","allowNull":false},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"payment":{"tableName":"payment","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"orderNo":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"amount":{"seqType":"Sequelize.DECIMAL","allowNull":false},"address":{"seqType":"Sequelize.STRING(255)","allowNull":false},"email":{"seqType":"Sequelize.STRING(255)","allowNull":false},"cellPhone":{"seqType":"Sequelize.STRING(255)","allowNull":false},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"productOrder":{"tableName":"productOrder","schema":{"productId":{"seqType":"Sequelize.STRING(20)","unique":"productOrder_orderId_productId_unique","primaryKey":true,"references":{"model":"product","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"orderId":{"seqType":"Sequelize.STRING(50)","unique":"productOrder_orderId_productId_unique","primaryKey":true,"references":{"model":"order","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"course":{"tableName":"course","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"courseImage":{"seqType":"Sequelize.STRING(255)","allowNull":false},"authorId":{"seqType":"Sequelize.STRING(20)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"lesson":{"tableName":"lesson","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"content":{"seqType":"Sequelize.TEXT","allowNull":false},"duration":{"seqType":"Sequelize.INTEGER","allowNull":false},"difficulty":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"prerequisites":{"seqType":"Sequelize.ARRAY(Sequelize.STRING)","allowNull":false},"objectives":{"seqType":"Sequelize.ARRAY(Sequelize.STRING)","allowNull":false},"keywords":{"seqType":"Sequelize.ARRAY(Sequelize.STRING)","allowNull":false},"author":{"seqType":"Sequelize.STRING(20)","allowNull":false,"unique":true},"category":{"seqType":"Sequelize.STRING(20)","allowNull":false,"unique":true},"language":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"targetAudience":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"rating":{"seqType":"Sequelize.INTEGER","allowNull":false},"authorId":{"seqType":"Sequelize.STRING(128)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"enrollment":{"tableName":"enrollment","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"enrollmentDate":{"seqType":"Sequelize.DATE","allowNull":false},"completionDate":{"seqType":"Sequelize.DATE","allowNull":false},"userId":{"seqType":"Sequelize.STRING(20)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"courseId":{"seqType":"Sequelize.STRING(20)","allowNull":false,"references":{"model":"course","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"quiz":{"tableName":"quiz","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"question":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"answers":{"seqType":"Sequelize.ARRAY(Sequelize.STRING)","allowNull":false},"correctAnswerIndex":{"seqType":"Sequelize.INTEGER","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"lesson_review":{"tableName":"lesson_review","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"lessonId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"lesson","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"comment":{"seqType":"Sequelize.TEXT","allowNull":false},"rating":{"seqType":"Sequelize.INTEGER","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}}}}'
            }],
            {}
        ]
    },



    {
        fn: "dropTable",
        params: ["review"]
    },

    {
        fn: "createTable",
        params: [
            "quiz",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "question": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "answers": {
                    "allowNull": false,
                    "type": Sequelize.ARRAY(Sequelize.STRING)
                },
                "correctAnswerIndex": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "product_review",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "productId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "product",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "comment": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "rating": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "course",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "title": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "courseImage": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "authorId": {
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                },
                "userId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING(50)
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "lesson",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "title": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "content": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "duration": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "difficulty": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "prerequisites": {
                    "allowNull": false,
                    "type": Sequelize.ARRAY(Sequelize.STRING)
                },
                "objectives": {
                    "allowNull": false,
                    "type": Sequelize.ARRAY(Sequelize.STRING)
                },
                "keywords": {
                    "allowNull": false,
                    "type": Sequelize.ARRAY(Sequelize.STRING)
                },
                "author": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "category": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "language": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "targetAudience": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "rating": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "authorId": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                },
                "userId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING(50)
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "enrollment",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "enrollmentDate": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "completionDate": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "courseId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "course",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "lesson_review",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "lessonId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "lesson",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "comment": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "rating": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    }
];

const rollbackCommands = [

    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
            }],
            {}
        ]
    },



    {
        fn: "dropTable",
        params: ["product_review"]
    },
    {
        fn: "dropTable",
        params: ["course"]
    },
    {
        fn: "dropTable",
        params: ["lesson"]
    },
    {
        fn: "dropTable",
        params: ["enrollment"]
    },
    {
        fn: "dropTable",
        params: ["lesson_review"]
    },
    {
        fn: "dropTable",
        params: ["quiz"]
    },

    {
        fn: "createTable",
        params: [
            "review",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "productId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "product",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "userId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "comment": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "rating": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    }
];

module.exports = {
  pos: 0,
  up: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }

      next();
    });
  },
  down: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        }
        else resolve();
      }

      next();
    });
  },
  info
};
