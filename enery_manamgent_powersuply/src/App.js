import './App.css';
import {Button} from "react-bootstrap";
import PowerOverview from "./component/powerOverview/PowerOverview";

function App() {


  return (
    <div className="App">
     <p>Powersuply Managment</p>
        <PowerOverview/>
        <Button >Manage Powersuply Option</Button>
    </div>
  );
}

export default App;
