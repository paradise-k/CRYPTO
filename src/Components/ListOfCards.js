import React,{useEffect , useState} from "react";
import axios from 'axios'
import Card from "./Card";
import { Scrollbars } from 'react-custom-scrollbars';
import CustomLoader from "./Loader";

const ListOfCards = () => {
  const [symbols , setSymbols] = useState([]);
  const [loader , setLoader] = useState([]);
  
  useEffect(() => {
    setLoader(true)
    axios.get(`https://api.kucoin.com/api/v1/symbols?market=USDS`)
    .then(response => { 
      sortSymbols(response.data.data)
    })
    .catch(error => console.error(error))
  }, [])


  const sortSymbols = (items) => {
    const listOfMarkedSymbols  = JSON.parse(localStorage.getItem('markedSymbolsList')) || [];
    let symbolsList = []
    if ( listOfMarkedSymbols.length > 0){
      for( let item of items){
        symbolsList.push({
                symbol: item.symbol,
                baseCurrency: item.baseCurrency,
                isMarked: isItMarked(item.symbol , listOfMarkedSymbols) ? 1 : 0
              })
      }
      setSymbols(symbolsList.sort((a, b) => (a.isMarked > b.isMarked) ? -1 : 1))
      setLoader(false)
    }
    else{
      setSymbols(items)
      setLoader(false)
    }
  }

  const isItMarked = (item , markedSymbols) => {
     for( let markedItem of markedSymbols ){
          if(item === markedItem) return true;
        }
        return false;
  }

  return (
    <div className="col-xl-3 col-lg-3 clo-md-3 col-sm-12 col-12">
      {loader 
        ? <CustomLoader />
        : <div className="list">
        <Scrollbars
        autoHide
        autoHideTimeout={1000}
        style={{ width:'100%', height: '100%'}}>
          {symbols.map(( item , index)=> (
            <Card data={item} key={index}/>
          ))}
          </Scrollbars>
        </div>
    }
    </div>
  )
}

export default ListOfCards;