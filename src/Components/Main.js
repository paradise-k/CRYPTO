import React,{ useEffect } from "react";
import LineChart from './LineChart'
import ListOfCards from "./ListOfCards";

const Main = () => {

  useEffect(() => {
    // console.log()
  }, [])

  return(
    <div className="main">
      <div className="container inner">
        <ListOfCards/>
        <LineChart />
      </div>
    </div>
  )
}

export default Main;