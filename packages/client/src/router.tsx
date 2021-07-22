import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/home/Home';
import GodwokenInfo from './components/widget/godwokenInfo/GodwokenInfo';

export default function MyRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/godwoken_info'>
          <GodwokenInfo></GodwokenInfo>
        </Route>
        <Route path='/'>
          <Home></Home>
        </Route>
     </Switch> 
    </BrowserRouter>
  );
}
