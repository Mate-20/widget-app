import React, { lazy } from 'react';
import MultipleData from './MultipleData'
import SingleData from "./SingleData"
import cardData from '../eventdata/data.json'
import { useLocation } from 'react-router-dom';

const DataHandle = () => {
    const location = useLocation();

  const { theme, layout } = location.state;
    return (
        <div>
            {cardData.length === 1
                ? <SingleData cardData={cardData} />
                : <MultipleData cardData={cardData} layout={layout} theme={theme} />
            }
        </div>
    )
}

export default DataHandle