/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zuqrf78m793tbaa",
    "created": "2024-12-21 20:58:43.062Z",
    "updated": "2024-12-21 20:58:43.062Z",
    "name": "nickNames",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "faactnip",
        "name": "user_id",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "uyx46h89",
        "name": "user_nickname",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_u8yI8Vo` ON `nickNames` (`user_nickname`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zuqrf78m793tbaa");

  return dao.deleteCollection(collection);
})
