import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from "./Recipe"

const App = () => {
  const APP_ID = '5d986c87'
  const APP_KEY = '0f37aaae0a6a88e2e5259d181daf323f'

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query])   //Not clear why do we need to write query here in this array


  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    console.log(data.hits)  //always runs twice in console why?
    setRecipes(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value)
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('')
  }


  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className='recipes'>

      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients} />
        ))}
        </div>
    </div>
  );
}

export default App;
