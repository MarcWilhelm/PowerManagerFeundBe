import React, {useEffect, useState} from 'react';

const PowerOverview = () => {
    const [currentPower, setCurrentPower] = useState(0)
    useEffect(() => {
        const url = "https://f550-77-109-144-90.ngrok-free.app/webhook/latest";

        fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));

    }, []);

    return (
        <div>
            <p>Current Powersuply {currentPower}</p>
        </div>
    );
};

export default PowerOverview;