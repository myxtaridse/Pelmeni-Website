export { default as SkeletProduct } from "./SkeletonProduct";
export { default as CartEmpty } from "./CartEmpty";
export { default as Loading } from "./Loading";
export { default as NotFoundBlock } from "./NotFound";
export { default as Pagination } from "./Pagination";
export { default as Search } from "./Search";
export { default as CartItem } from "./CartItem";
export { default as Categories } from "./Categories";
//export { default as CharacterItem } from "./CharacterItem";
export { default as Header } from "./Header";
export { default as PelmeniBlock } from "./Pelmeni-Block";
export { default as Skeleton } from "./Skeleton";
export { default as Sort } from "./Sort";

// выше - реэкспорт всех файлов в один, дабы не было очень много строчек импорта в остальных важных файлах
// сократили код, мы импортировали и экспортировали все файлы в одном,
// что в страничных файлах получилась одна строчка
// import {SkeletProduct, CartEmpty, Loading, NotFoundBlock и т.д.} from '../components/index'
