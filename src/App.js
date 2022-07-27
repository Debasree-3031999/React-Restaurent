
import './App.css';
import {useEffect,useState,useRef} from "react"
import axios from "axios"
var str='';
function App() {
  
  const [ingredientList,updateIngredientList]=useState([]);
  const [loading,setLoading]=useState(false)
  const inputRef=useRef(null)
  const api_key ="e40a3bbb37b4454a5d3bb9a3eab31403";
  const api_id="b096588c"
  

  const SearchforRecipe = query =>{
    setLoading(true)
    let url=`https://api.edamam.com/search?q=${query}&app_id=${api_id}&app_key=${api_key}`
    // fetch(url)
    axios.get(url)
    .then(shree => {
      console.log(shree)
      return shree.data.hits;
      // updateIngredientList(shree.data)

    })
    .then(res =>{
      console.log("final response",res)
      updateIngredientList(res)
      setLoading(false)

    })
    .catch(err =>{console.log("error",err)
  setLoading(false)
  })


  }
  useEffect(()=>{
    SearchforRecipe(null)
   
  },[])
  const Search=()=>{
    str=inputRef.current.value;
    SearchforRecipe(str)
    


  }
  
  return (
    <div className="App">
     
      <header className='app-header'>
      <p className="chhutu" style={{fontSize:"10vw",}}>Restaurant</p>
        <div><input style={{width:"70%",height:"40px",borderRadius:"7px",backgroundColor:"pink",marginBottom:"6%"}} ref={inputRef}placeholder='Search for Recipe' />
        <button style={{width:"50%",height:"30px",borderRadius:"7px",backgroundColor:"raddish",}} onClick={Search}>Search for Recipe</button></div>
        {loading && <p>loading...</p>}
    <div className='wrapper'>
      {ingredientList.map((item,i)=>{
        return(
          <div className='ingredient' key={i}>
            <h3 style={{color:"white"}}>{item.recipe.label}</h3>
          <img src={item.recipe.image}/>
          <div className='step'>
          {item.recipe.ingredientLines.map((step,i)=>{
            return <div ><p key={i}>{step}</p></div>
          })}
          </div>

          </div>
        )
      })}
    </div>

      </header>
       
    </div>
  );
}

export default App;
