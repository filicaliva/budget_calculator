import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux';
import {
  changeIncome,
  selectIncome,
  selectSum,
  selectData,
  setData,
  selectCutoutPercentage
} from './counterSlice';
import styles from './Counter.module.css';
import { Item } from './item/Item';

import eat from './symbols/food.png'
import study from './symbols/study.png'
import leisure from './symbols/leisure.png'

export function Calculator() {
  const count = useSelector(selectIncome);
  const sum = useSelector(selectSum)
  const data = useSelector(selectData)
  const cutoutPercentage = useSelector(selectCutoutPercentage)
  const dispatch = useDispatch();

  const [categories] = useState([
    {
      id: 1,
      title: 'Eat',
      color: '#EB5757',
      symbol: eat,
    },
    {
      id: 2,
      title: 'Study',
      color: '#83C7F3',
      symbol: study,
    },
    {
      id: 3,
      title: 'Leisure',
      color: '#FEE29E',
      symbol: leisure,
    },
    {
      id: 4,
      title: 'Soon',
      color: '#E0E0E0'
    }
  ])

  const chartValue = {
    data: {
      datasets: [{
        data,
        backgroundColor: [
          'rgba(39,174,96,1)',
          'rgba(235, 87, 87, 1)',
          'rgba(131, 199, 243, 1',
          'rgba(254, 226, 158, 1)'
        ],
        hoverBackgroundColor: [
          'rgba(39,174,96,.8)',
          'rgba(235, 87, 87,.8)',
          'rgba(131, 199, 243,.8',
          'rgba(254, 226, 158,.8)'
        ],
        hoverBorderColor: '#E7E7E7 ',
        hoverBorderWidth: 2
      }]
    },
    options: {
      cutoutPercentage,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      hover: {
        animationDuration: 500
      }
    }
  }


  useEffect(() => {
    dispatch(setData())
  },[dispatch])

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
            value={count}
            onChange={e => dispatch(changeIncome(e.target.value))}
            onBlur={(e) => dispatch(setData(e.target.value))}
          />
          <p className={styles.expenses}>{sum}</p>
        </div>
        <Doughnut
          data={chartValue.data}
          options={chartValue.options}
          width={10}
          height={8}
        />

      </div>

      <div className={styles.categories_container}>

        {categories.map(item => <Item {...item} />)}

      </div>
    </div>
  );
}
