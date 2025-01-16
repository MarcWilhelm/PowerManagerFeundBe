import React, {useState} from 'react';

const PowerOverview = () => {
    const [currentPower, setCurrentPower] = useState(0)
    return (
        <div>
            <p>Current Powersuply {currentPower}</p>
        </div>
    );
};

export default PowerOverview;