import './App.css';
import {Button} from "react-bootstrap";
import PowerOverview from "./component/powerOverview/PowerOverview";
import {useEffect, useState} from "react";


function App() {
    const [client, setClient] = useState(null);
    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(host, mqttOption));
    };

    useEffect(() => {
        if (client) {
            console.log(client);
            client.on('connect', () => {
                setConnectStatus('Connected');
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                setConnectStatus('Reconnecting');
            });
            client.on('message', (topic, message) => {
                const payload = { topic, message: message.toString() };
                setPayload(payload);
            });
        }
    }, [client]);

  return (
    <div className="App">
     <p>Powersuply Managment</p>
        <PowerOverview/>
        <Button >Manage Powersuply Option</Button>
    </div>
  );
}

export default App;
