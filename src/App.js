import { useEffect, useState, useRef } from 'react';
import './App.css'
function App() {
  const API_ID = '040c0559';
  const API_KEY = '91c5f48e263a4937f22dc1425ac7e35e';

  const [ingredientList, updateIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);



  useEffect(() => {
    searchForRecipes('chicken');
  }, []);

  const search = (query) => {
    searchForRecipes(inputRef.current.value);
    inputRef.current.value = "";
  }

  const searchForRecipes = (query) => {
    setLoading(true);
    let url = `search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`;
    fetch(url, { mode: "no-cors" })
      .then(response => {
        return response.json();
      })
      .then((res) => {
        updateIngredientList(res.hits);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error : ', error);
        setLoading(false);
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="InputWrapper">
          <input ref={inputRef} placeholder="Search for recipe." />
          <button onClick={search} >Search</button>
        </div>
        {loading && <p>Loading .....</p>}
        <div className="Wrapper">
          {ingredientList.map((({ recipe }) => {
            const { label, image, ingredientLines } = recipe;
            return (
              <div key={label} className="Ingredient">
                <span>{label}</span>
                <img src={image} />
                <div className="Steps">
                  {ingredientLines.map((step, index) => {
                    return (<p key={index}>{step}</p>)
                  })}
                </div>
              </div>
            )
          }))}
        </div>
      </header>
    </div>
  );
}

export default App;
