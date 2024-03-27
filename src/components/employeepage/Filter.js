import React from 'react'
import styles from './filter.style.module.css'
import Tag from './Tag';
const Filter = () => {
    let category = ["Hospitality", "Festivals"];
    let eventType = ["Hospitality", "Festivals"];
    let participations = ["Hospitality", "Festivals"];
    let geography = ["India"];
    let eventFormat = ["India"];

    return (
        <div>
            <div className={styles.heading}>Filters</div>
            <div className={styles.filters}>
                <div className={styles.leftContainer}>
                    <div className={`${styles.filterOption} ${styles.categoryFilter}`}>Category
                        <div className={styles.tag}>
                            {category.map((item, key) => (
                                <Tag key={key} tagName={item} />
                            ))}
                        </div>
                    </div>
                    <div className={`${styles.filterOption} ${styles.eventFilter}`}>Event Type
                        <div className={styles.tag}>
                            {eventType.map((item, key) => (
                                <Tag key={key} tagName={item} />
                            ))}
                        </div>
                    </div>
                    <div className={styles.filterOption}>Mode of Participations
                        <div className={styles.tag}>
                            {participations.map((item, key) => (
                                <Tag key={key} tagName={item} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.filterOption}>Geography
                        <div className={styles.tag}>
                            {geography.map((item, key) => (
                                <Tag key={key} tagName={item} />
                            ))}
                        </div>
                    </div>
                    <div className={styles.filterOption}>Event Format
                        <div className={styles.tag}>
                            {eventFormat.map((item, key) => (
                                <Tag key={key} tagName={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter