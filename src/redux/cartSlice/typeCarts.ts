// item - является массивом объектов, также его надо отдельно типизировать
// создаем специальный тип структуры чего-то, именно слайса корзины
export type CartItem = {
  id: string;
  name: string;
  price: number;
  count: number;
  sizes: number;
  imageUrl: string;
  types: string;
};

// type и interface - выполняют одну и ту же задачу,
// что-то типизируют
// отличие в том, что type может типизировать как отдельную переменную, так и объект
// interface типизирует только объект, содержащий в себе свойства

// типизируем начальные значения

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
