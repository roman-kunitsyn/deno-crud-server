import { RouterContext } from '@oak/oak'
import * as service from './service.ts'

export function filterList(ctx: RouterContext<"/filterList">) {console.log(ctx.params); const data = service.filterList(); return data;}

export function createItem(ctx: RouterContext<"/createItem">) {console.log(ctx.params); const data = service.createItem(); return data;}
export function readItem(ctx: RouterContext<"/readItem">) {console.log(ctx.params); const data = service.readItem(); return data;}
export function updateItem(ctx: RouterContext<"/updateItem">) {console.log(ctx.params); const data = service.updateItem(); return data;}
export function deleteItem(ctx: RouterContext<"/deleteItem">) {console.log(ctx.params); const data = service.deleteItem(); return data;}

export function bulkCreateItem(ctx: RouterContext<"/bulkCreateItem">) {console.log(ctx.params); const data = service.bulkCreateItem(); return data;}
export function bulkUpdateItem(ctx: RouterContext<"/bulkUpdateItem">) {console.log(ctx.params); const data = service.bulkUpdateItem(); return data;}
export function bulkDeleteItem(ctx: RouterContext<"/bulkDeleteItem">) {console.log(ctx.params); const data = service.bulkDeleteItem(); return data;}

export function exportFilteredList(ctx: RouterContext<"/exportFilteredList">) {console.log(ctx.params); const data = service.exportFilteredList(); return data;}
export function importCreateItems(ctx: RouterContext<"/importCreateItems">) {console.log(ctx.params); const data = service.importCreateItems(); return data;}
export function importUpdateItems(ctx: RouterContext<"/importUpdateItems">) {console.log(ctx.params); const data = service.importUpdateItems(); return data;}
export function importDeleteItems(ctx: RouterContext<"/importDeleteItems">) {console.log(ctx.params); const data = service.importDeleteItems(); return data;}
