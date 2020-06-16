import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'main',
  initialState: {
    incomeDefault: window.localStorage.getItem('income') || '',
    income: window.localStorage.getItem('income') || '',
    expenses: [],
    sum: window.localStorage.getItem('sum') || '00.00',
    data: [],
    allow: true,
    cutoutPercentage: 100,
    amount: JSON.parse(window.localStorage.getItem('amount')) || []
  },
  reducers: {
    changeIncome: (state, action) => {
      state.income = action.payload;
      state.data[0] = action.payload;
      localStorage.setItem('data', JSON.stringify(state.data))
      localStorage.setItem('income', state.income)
    },
    changeExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    changeAmount: (state, action) => {
      state.amount[action.payload.id] = action.payload.value
    },
    setSum: (state) => {
      let sum2 = 0
      state.amount.map((item) => {
       return sum2 =sum2 + +item
      })
      state.sum = (Math.round(Number(sum2) * 100) / 100).toFixed(2)
      state.income = (Math.round(Number(localStorage.getItem('income') - state.sum) * 100) / 100).toFixed(2)
      if (+state.income < 0) {
        state.data[0] = 0
      } 
      window.localStorage.setItem('sum', state.sum)
      window.localStorage.setItem('data', JSON.stringify(state.data))
    },

    setArray: (state, action) => {
      if (state.expenses === undefined || state.expenses.length === 0) {
        state.expenses.push({ id: action.payload.id, value: action.payload.value })
        state.data[action.payload.id] = action.payload.value
      } else {
        const inArray = state.expenses.some(item => {
          const obj = { ...item }
          return obj.id === action.payload.id
        })
        if (inArray) {
          state.expenses.forEach(item => {
            const obj = { ...item }
            if (obj.id === action.payload.id) {
              for (const property in item) {
                if (property === 'value') {
                  item[property] = action.payload.value
                  state.data[obj.id] = action.payload.value
                }
              }
            }
          })
        } else {
          state.expenses.push({ id: action.payload.id, value: action.payload.value })
          state.data[action.payload.id] = action.payload.value
        }
      }
      state.amount[action.payload.id] = (Math.round(Number(action.payload.value) * 100) / 100).toFixed(2)
      window.localStorage.setItem('data', JSON.stringify(state.data))
      window.localStorage.setItem('amount', JSON.stringify(state.amount))
    },
    setData: (state) => {
      if (state.income !== '' && +state.income !== 0) {
        state.incomeDefault = window.localStorage.getItem('income')
        state.income = (Math.round(Number(state.incomeDefault - state.sum) * 100) / 100).toFixed(2)
        state.data = JSON.parse(window.localStorage.getItem('data'))
        state.allow = false
        state.cutoutPercentage = 88

      } else {
        state.cutoutPercentage = 100
        for (let i = 0; i < state.amount.length; i++) {
          state.amount[i] = '';
        }
        state.allow = true
        state.expenses = []
        state.data = []
        state.sum = '00.00'
        window.localStorage.setItem('data', JSON.stringify(state.data))
        window.localStorage.setItem('amount', JSON.stringify(state.amount))
        window.localStorage.setItem('sum', state.sum)

      }
    }
  },
});

export const { changeAmount, setArray, setSum, changeIncome, setData, changeExpenses } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(change(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIncome = state => state.main.income;
export const selectExpenses = state => state.main.expenses;
export const selectSum = state => state.main.sum;
export const selectData = state => state.main.data;
export const selectAllow = state => state.main.allow;
export const selectCutoutPercentage = state => state.main.cutoutPercentage;
export const selectAmount = state => state.main.amount;


export default counterSlice.reducer;
