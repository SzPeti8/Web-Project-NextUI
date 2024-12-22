/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zuqrf78m793tbaa")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_z5cJ4vi` ON `nickNames` (`user_id`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xnrqmiwh",
    "name": "user_nickname2",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uyx46h89",
    "name": "user_nickname1",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zuqrf78m793tbaa")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_u8yI8Vo` ON `nickNames` (`user_nickname`)"
  ]

  // remove
  collection.schema.removeField("xnrqmiwh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uyx46h89",
    "name": "user_nickname",
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

  return dao.saveCollection(collection)
})
