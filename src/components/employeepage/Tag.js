import React from 'react'
import styles from './tag.style.module.css'

const Tag = ({tagName}) => {
  return (
    <div className={styles.tag}>{tagName}</div>
  )
}

export default Tag