import React from 'react'
import { Radio } from 'antd';

export const Group = ({ name, base, metrics, values, getAnswer }) => {
    
    return (
        <div style={{ display: 'grid', padding: '0 12px' }} >
            {name}
            < Radio.Group value={base} onChange={getAnswer} style={{ padding: '12px 0' }}>
                <Radio.Button value={values[0]}>{metrics[0]}</Radio.Button>
                <Radio.Button value={values[1]}>{metrics[1]}</Radio.Button>
                <Radio.Button value={values[2]}>{metrics[2]}</Radio.Button>
            </Radio.Group >
        </div >
    )
}