import './DataCard.css';
import { useEffect, useState } from "react"

export const DataCard = () =>{
 const [showData, setShowData] = useState([])
 const [search, setSearch] = useState('')

    const getData = async() =>{
        try {
            const res = await fetch("https://api.punkapi.com/v2/beers")
            const data = await res.json()
            setShowData(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        getData()
    },[])
    const clickHandler = () =>{
       const searchedProd = showData.filter(({name})=> name.toLowerCase().includes(search.toLowerCase()))
       setShowData(searchedProd)
    }
    return<>
    <input value = {search} placeholder='Search by Name' onChange={(e)=>setSearch(e.target.value)}/>
    <button onClick={clickHandler}>Search</button>
    <div>
        
        {showData.map(({id, name, tagline, image_url})=>
    <div className='data_container' >
    <div className='data_card' key={id}>
        <img className='data_card_img' src={image_url} height={200} width={200}/>
        <h3 className='data_card_name'>{name}</h3>
        <p className='data_card_tagline'>{tagline}</p>
        </div>
        </div>
        )}</div>
    </>
}