import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [seenPokemon, setSeenPokemon] = useState([]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleClick(pokemon) {
    if(seenPokemon.includes(pokemon)){
      if(currScore>bestScore){
        setBestScore(currScore);
      }
      setCurrScore(0);
      setSeenPokemon([]);
    }
    else{
      let newSeenPokemon = [...seenPokemon, pokemon];
      setSeenPokemon(newSeenPokemon);
      setCurrScore((score) => score+1 );
    }
  }

  let pokemonArray = ['pikachu', 'squirtle', 'bulbasaur', 'charmander', 'lucario', 'dragonite', 'chansey', 'pidgeot', 'heracross', 'suicune', 'articuno', 'arceus', 'ho-oh', 'arcanine', 'lapras']
  return (
    <>
      <div className='game-cont'>
        <div className='game-heading'>Pokemon Memory Game</div>
        <div className='game-score'>
          <div>Current Score: {currScore}</div>
          <div>Best Score: {bestScore}</div>
        </div>
      </div>
      <div className='card-container'>
        {shuffleArray(pokemonArray).map((pokemon) => {
            return <Card key = {pokemon} pokemonName = {pokemon} handleClick = {handleClick}></Card>;
        })}
      </div>
    </>
  )
}

export default App
