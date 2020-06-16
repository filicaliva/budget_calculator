import React  from 'react'
import styles from './Item.module.css'
import {
    setArray, setSum, selectAllow, selectAmount, changeAmount
} from '../counterSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Item = ({ id, title, color, symbol }) => {
    const allow = useSelector(selectAllow)
    const amount = useSelector(selectAmount)
    const dispatch = useDispatch()
    const bgcolor = {
        backgroundColor: color
    }
    const fontColor = {
        color
    }

    return (
        <div className={styles.item}>
            <p className={styles.item__title}>{title}</p>
            <div className={styles.item__circle} style={bgcolor}>
                <img src={symbol} className={styles.item__image} alt={title.toLowerCase()} />
            </div>
            <input
                id={id}
                type="number"
                placeholder='00.00'
                className={styles.value}
                style={fontColor}
                value={amount[id]}
                onChange={e => dispatch(changeAmount({ value: +e.target.value, id }))}
                disabled={allow}
                onBlur={(e) =>
                    dispatch(
                        setSum(),               
                        dispatch(setArray({ value: +e.target.value, id }))
                    )
                } />
        </div>
    )
}