import React, {useEffect , useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import CustomLoader from './Loader';
const LineChart = (props) =>{

  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name') || 'BTC-USDT';
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const [priceList, setPriceList] = useState([]);
  const [times, setTimes] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    axios.get(`https://api.kucoin.com/api/v1/market/candles?type=1day&symbol=${name}&startAt=1606071973`)
    .then(response => { 
      neededItems(response.data.data)
    })
    .catch(error => console.error(error))
  }, [name])

  const neededItems = (items) =>{
    let closeList = []
    let epochTimes = []
    for(let item of items ){
      let date = new Date( JSON.parse(item[0]) *1000)
      epochTimes.push(`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)
      closeList.push(item[2])
    }
    setPriceList(closeList)
    setTimes(epochTimes)
    setLoader(false)
    
  } 


  return(
    <div className="col-xl-9 col-lg-9 clo-md-9 col-sm-12 col-12">
      <div className="chart">
      {loader 
        ? <CustomLoader />
        : <Line 
              data={{
                labels:times ,
                datasets: [ {
                  label: name,
                  data: priceList,
                  borderColor:'#ff3d3d',
                  backgroundColor:'#ff3d3db3',
                },]
              }}
              width={'98%'}
              height={'55vh'}
              options={{
                fill: false,
                interaction: {
                  intersect: false
                },
                radius: 0,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'crypto'
                  }
                }
              }}
            />
    }
      </div>
    </div>
  )
}

export default LineChart;