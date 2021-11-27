import React,{useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {

  const [isMarked, setIsMarked ]= useState(true)
  const navigate = useNavigate();

  useEffect(() => { 
    props.data.isMarked && props.data.isMarked === 1 
    ? setIsMarked(true)
    : setIsMarked(false)
  }, [])

  const markIt = () => {
    let listOfMarkedSymbols = JSON.parse(localStorage.getItem('markedSymbolsList')) || [];
    if(isMarked){ 
      for( let i = 0; i < listOfMarkedSymbols.length; i++){ 
        if ( listOfMarkedSymbols[i] === props.data.symbol) { 
           listOfMarkedSymbols.splice(i, 1)
           localStorage.setItem('markedSymbolsList', JSON.stringify(listOfMarkedSymbols))
            setIsMarked(false)
        }
    }
    
    }else{
      setIsMarked(true)
      listOfMarkedSymbols.push(props.data.symbol);
      localStorage.setItem('markedSymbolsList', JSON.stringify(listOfMarkedSymbols) )
    }

  }

  const handleShownSymbol = () =>{
    navigate(`/?name=${props.data.symbol}`)
  }

  return (
    <div className="crypto-card" >
      <span className="star">
        <img 
          src={isMarked ? '/images/star.png': '/images/star-gray.png'} 
          alt='star'
          onClick={markIt}
        />
      </span>
      <div className="info" onClick={handleShownSymbol}>
        <h6>{props.data.symbol}</h6>
        <span>{props.data.baseCurrency}</span>
      </div>
    </div>
  )
}

export default Card;
