import React, { useState, useEffect } from 'react';
import Chart from 'chart.js'
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';
import { Item } from './item/Item';

import eat from './symbols/food.png'
import study from './symbols/study.png'
import leisure from './symbols/leisure.png'

export function Counter() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState();

  const [categories, setCategories] = useState([
    {
      title: 'Eat',
      color: '#EB5757',
      symbol: eat
    },
    {
      title: 'Study',
      color: '#83C7F3',
      symbol: study
    },
    {
      title: 'Leisure',
      color: '#FEE29E',
      symbol: leisure
    },
    {
      title: 'Soon',
      color: '#E0E0E0',
      symbol: '+'
    }
  ])

  const circle = () => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['January', 'February', 'mamasha'],
        datasets: [{
          data: [20, 60, 20, 10],
          backgroundColor: [
            '#27AE60',
            '#EB5757',
            '#83C7F3',
            '#FEE29E',
          ],
          hoverBackgroundColor: [
            '#27AE60',
            '#FBA0B6',
            '#83C7F3',
            '#FEE29E',
          ],
          hoverBorderColor: '#E7E7E7 ',
          hoverBorderWidth: 2
        }]
      },
      options: {
        cutoutPercentage: 85,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });

  }

  useEffect(() => { circle() }, [])



  return (
    <div>

      <div className={styles.container} >
        <div className={styles.value}>
          <input
            type="number"
            id='account'
            placeholder="00.00"
            className={styles.account}
            autoComplete='off'
            value={incrementAmount}
            onChange={e => setIncrementAmount(e.target.value)}
          />
          <p className={styles.expenses}>00.00</p>
        </div>
        <canvas id="myChart">
        </canvas>

      </div>

      <div className={styles.categories_container}>

        {categories.map(item => <Item {...item} />)}

      </div>



      {/* <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div> */}
    </div>
  );
}
