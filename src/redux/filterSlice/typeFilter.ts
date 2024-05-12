export enum SortPropertyProps {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  NAME_DESC = "name",
  NAME_ASC = "-name",
}

export type SortProps = {
  name: string;
  sortProperty: SortPropertyProps;
};

export interface FilterProps {
  categoryId: number;
  isSearch: string;
  currentPage: number;
  sort: SortProps;
}
