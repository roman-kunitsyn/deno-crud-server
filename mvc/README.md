# Full API list

```
filterList({filter, sort, pagination}) -> {filter, sort, pagination, data: data[]}

createItem(data) -> data
readItem(id) -> data
updateItem(data) -> data
deleteItem(id) -> boolean

bulkCreateItem(data[]) -> {performed, errored}
bulkUpdateItem(data[]) -> {performed, errored}
bulkDeleteItem(id[]) -> {performed, errored}

exportFilteredList({filter, sort, pagination}) -> csv[]
exportSelectedItem(id) -> pdf

importCreateItems(csv) -> {performed, errored}
importUpdateItems(csv) -> {performed, errored}
importDeleteItems(csv) -> {performed, errored}
```
