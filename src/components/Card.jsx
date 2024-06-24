    import { useEffect, useState } from "react";
    import axios from 'axios';
    import '../styles/card.css'

    function Card({ pokemonName, handleClick }) {
        const [pokemon, setPokemon] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        function capitalizeFirstLetter(string) {
            if (!string) return string;
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        useEffect(() => {
            const fetchPokemon = async () => {
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
                    setPokemon(response.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchPokemon();
        }, []);

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        if (!pokemon) {
            return <div>No pokemon data available</div>;
        }

        return (
            <div className="pokemon-cont" onClick={() => handleClick(pokemonName)}>
                <div className="pokemon-card">
                    <img 
                        height={230}
                        width={230}
                        src={pokemon.sprites.other["official-artwork"].front_default} 
                        alt={pokemon.name} 
                    />
                    <div className="pokemon-title">{capitalizeFirstLetter(pokemon.name)}</div>
                </div>
            </div>
        );
    }

    export default Card;