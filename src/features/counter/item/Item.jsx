import React from 'react'
import styles from './Item.module.css'

export const Item = ({ title, color, symbol }) => {

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
                <img src={symbol} className={styles.item__image} alt={title.toLowerCase()}  />
            </div>
            <input
                type="number"
                placeholder='00.00'
                className={styles.value}
                style={fontColor}
            />
        </div>
    )
}