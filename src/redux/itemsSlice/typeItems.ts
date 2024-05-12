export type ProductsProps = {
  currentPage: number;
  category: string;
  sortBy: string;
  sortOrder: string;
  search: string;
};
// ---> замена на --->
// Когда все свойства строчки и значения строчки
//type ProductsProps = Record<string, string>; --->  упрощает код

export type ItemsProps = {
  id: string;
  name: string;
  price: number;
  count: number;
  sizes: number[];
  imageUrl: string;
  types: number[];
};

// статус в виде объекта, ключ всегда с большой буквы
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface ItemsPropsSlice {
  items: ItemsProps[];
  webStatus: Status;
}
