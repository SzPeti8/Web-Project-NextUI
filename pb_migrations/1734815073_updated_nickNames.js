/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zuqrf78m793tbaa")

  // remove
  collection.schema.removeField("faactnip")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xwlzk10m",
    "name": "user_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zuqrf78m793tbaa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "faactnip",
    "name": "user_id",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("xwlzk10m")

  return dao.saveCollection(collection)
})
