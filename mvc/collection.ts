export class Collection {
  private db: Record[] = [];

  private generateItem(item: Record): Record {
    const record: Record = {};
    record.id = Date.now().toString();
    record.createdAt = new Date().toISOString();
    record.name = item.name;
    record.description = item.description;
    record.data = item.data;
    return record;
  }

  constructor() {
    this.db = [];
  }

  public filterList(dto: FilterListDto): FilterListResponse {
    const response = { ...dto, data: this.db };
    
    if (dto.filter) {
      response.data = response.data.filter((item) => {
        let flag = true;

        if (dto.filter?.ids && item.id) {
          flag = dto.filter?.ids?.includes(item.id);
        }

        if (dto.filter?.name && item.name) {
          flag = new RegExp(dto.filter.name).test(item.name);
        }

        if (dto.filter?.description && item.description) {
          flag = new RegExp(dto.filter.description).test(item.description);
        }

        if (
          dto.filter?.createdAtStart &&
          dto.filter?.createdAtEnd &&
          item.createdAt
        ) {
          flag =
            new Date(item.createdAt) >= new Date(dto.filter?.createdAtStart) &&
            new Date(item.createdAt) <= new Date(dto.filter?.createdAtEnd);
        }
        return flag;
      });
    }

    if (dto.sort) {
      if (dto.sort?.name) {
        response.data = response.data.sort((a1, a2) => {
          if (a1.name && a2.name) {
            if (dto.sort?.name === "asc") {
              if (a1.name > a2.name) {
                return 1;
              } else {
                return -1;
              }
            }
            if (dto.sort?.name === "desc") {
              if (a1.name > a2.name) {
                return -1;
              } else {
                return 1;
              }
            }
          }
          return 0;
        });
      }

      if (dto.sort?.description) {
        response.data = response.data.sort((a1, a2) => {
          if (a1.description && a2.description) {
            if (dto.sort?.description === "asc") {
              if (a1.description > a2.description) {
                return 1;
              } else {
                return -1;
              }
            }
            if (dto.sort?.description === "desc") {
              if (a1.description > a2.description) {
                return -1;
              } else {
                return 1;
              }
            }
          }
          return 0;
        });
      }

      if (dto.sort?.createdAt) {
        response.data = response.data.sort((a1, a2) => {
          if (a1.createdAt && a2.createdAt) {
            if (dto.sort?.createdAt === "asc") {
              if (new Date(a1.createdAt) > new Date(a2.createdAt)) {
                return 1;
              } else {
                return -1;
              }
            }
            if (dto.sort?.createdAt === "desc") {
              if (new Date(a1.createdAt) > new Date(a2.createdAt)) {
                return -1;
              } else {
                return 1;
              }
            }
          }
          return 0;
        });
      }
    }

    response.pagination = { total: response.data.length };
    
    if (dto.pagination) {
      if (
        typeof dto.pagination?.skip === "number" &&
        typeof dto.pagination?.take === "number"
      ) {
        const { take, skip } = dto.pagination;
        response.pagination.skip = skip;
        response.pagination.take = take;
        response.data = response.data.slice(skip, skip + take);
      }
    }

    return response;
  }

  public createItem(item: Record): Record {
    const record = this.generateItem(item);
    this.db.push(record);
    return record;
  }

  public readItem(id: string): Record | undefined {
    const record = this.db.find((item) => {
      return item.id === id;
    });
    return record;
  }

  public updateItem(item: Record): Record | undefined {
    let index = -1;
    this.db = this.db.map((record, i) => {
      if (record.id === item.id) {
        index = i;
        return { ...record, ...item, updatedAt: new Date().toISOString() };
      }
      return record;
    });
    if (index === -1) {
      return;
    }
    return this.db[index];
  }

  public deleteItem(id: string): boolean {
    const lengthBefore = this.db.length;
    this.db = this.db.filter((record) => {
      return !(record.id === id);
    });
    const lengthAfter = this.db.length;
    return lengthBefore > lengthAfter;
  }
}

export class CommonSort {
  orderBy?: {
    [propName: string]: "asc" | "desc";
  }[];
}

export class Record {
  id?: string;
  name?: string;
  description?: string;
  data?: unknown;
  createdAt?: string;
  updatedAt?: string;
}

export class RecordFilter {
  ids?: string[];
  name?: string;
  description?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
}

export class RecordSort {
  name?: "asc" | "desc";
  description?: "asc" | "desc";
  createdAt?: "asc" | "desc";
}

export class CommonPagination {
  skip?: number;
  take?: number;
  total?: number;
}

export class FilterListDto {
  filter?: RecordFilter;
  sort?: RecordSort;
  pagination?: CommonPagination;
}

export class FilterListResponse {
  filter?: RecordFilter;
  sort?: RecordSort;
  pagination?: CommonPagination;
  data?: Record[];
}

function _clientCode() {
  const collection = new Collection();
  const item = collection.createItem({
    name: "Test Name",
    description: "Test Description",
  });
  console.log(item);
  const item2 = collection.updateItem({
    id: item.id,
    name: "Test Name v2",
    description: "Test Description v2",
  });
  console.log(item2);

  collection.createItem({
    name: "Test Name ee",
    description: "Test Description ee",
  });

  console.log(collection.filterList({ filter: { name: "v2" } }));
  console.log(collection.filterList({}));
}

async function clientCode2() {
  const collection = new Collection();

  for (const i of Array(10).keys()) {
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    collection.createItem({
      name: i.toString(),
      description: Math.floor(Math.random() * 10).toString(),
    });
    collection.createItem({
      name: i.toString(),
      description: Math.floor(Math.random() * 10).toString(),
    });
  }

  console.log(
    collection.filterList({
      sort: { createdAt: "asc" },
      filter: { name: "2" },
      pagination: { take: 1, skip: 0 },
    })
  );
}

clientCode2();
