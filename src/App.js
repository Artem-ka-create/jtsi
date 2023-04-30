import React from "react";
import { Route, Switch } from 'react-router-dom';

import './App.css';

import URLFormComponent from './components/Form/URLFormComponent';
import JitsiComponent from "./components/JitsiComponent/jitsi.component";
import ThankYouJitsiComponent from './components/JitsiComponent/ThankYouComponent/thank-you.component';
import HeaderComponent from './components/Header/HeaderComponent';


function App() {

  // const [conferenceSettings, setConferenceSettings] = useState(
  //   {
  //     url: 'https://meet.jit.si/124',
  //     username: 'LOLOLO',
  //     room: '124',
  //     email: 'a@getDefaultNormalizer.com',
  //     domenName: 'meet.jit.si'
  // });

  const HeaderText = "Video Conference Application";


  return (
    <div className="App">
       <HeaderComponent headerText={HeaderText} />
       {/* <URLFormComponent /> */}
 
          <Switch>
            <Route component={ThankYouJitsiComponent} path="/thank-you" />
            <Route component={URLFormComponent} path="/" exact />
            <Route component={JitsiComponent} path="/jitsi" />

            {/* <Route component={JitsiComponent} path="/" exact /> */}
        </Switch>
        
    </div>
  );
}

export default App;
