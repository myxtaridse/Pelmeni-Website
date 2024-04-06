// Одно из хранилищ состояния

import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 }; //первое - начальное состояние, начинается с нуля

//здесь будет логика, которая обрабатывает наш state - ниже
const filterSlice = createSlice({
  //создается Слайс, который хранит в себе определенные настройки в переменную counterSlice
  name: "filter", //его название
  initialState, //начальное состояние, как в useState('') - создается начальное состояние, в примере в виде empty string
  reducers: {
    //здесь методы, которые будут менять наше состояние
    increment(state) {
      //increment - увеличение счетчика
      // state - выступает как значение словно в useState()  //1 - команда - action
      state.value++;
    },
    decrement(state) {
      //decrement - уменьшение счетчика                      //2 - команда - action
      state.value--;
    },
    incrementByAmount(state, action) {
      //меняет счетчик, в которое можно передать +15, -15, вместо 1 в инкременте и декременте
      state.value += action.payload; //пример
    },
  },
});

export const { increment, decrement, incrementByAmount } = filterSlice.actions; //экспортирование значений из объекта
//actions - действия, которые нужно совершить со State, например, измени имя там-то там-то
export default filterSlice.reducer; //reducer - функция, логика, обработка всего State, отвечает за его изменение
// в reducer - хранятся все команды, в нашем случае increment, decrement, incrementByAmount
