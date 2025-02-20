import { Router } from "@oak/oak";
import * as controller from './controller.ts'

export const router = new Router();

router.post("/filterList", controller.filterList);

router.post("/createItem", controller.createItem);
router.post("/readItem", controller.readItem);
router.post("/updateItem", controller.updateItem);
router.post("/deleteItem", controller.deleteItem);

router.post("/bulkCreateItem", controller.bulkCreateItem);
router.post("/bulkUpdateItem", controller.bulkUpdateItem);
router.post("/bulkDeleteItem", controller.bulkDeleteItem);

router.post("/exportFilteredList", controller.exportFilteredList);
router.post("/exportSelectedItem", controller.exportSelectedItem);

router.post("/importCreateItems", controller.importCreateItems);
router.post("/importUpdateItems", controller.importUpdateItems);
router.post("/importDeleteItems", controller.importDeleteItems);

