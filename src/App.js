import React from 'react';
import logo from './logo.svg';
import Detail from './Pages/Detail';
import List from './Pages/List';
import { BrowserRouter, Route, Link,Switch } from "react-router-dom";


function App() {

return (
<div className="App">
  <div className='content'>
  <Switch>
    <Route exact path="/" component={List} />
    <Route path="/detail/:id" component={Detail} />
  </Switch>
  </div>
   </div>
  );
}

export default App;
