import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonDetails } from "../api/pokemonApi";
import "../App.css";

const PokemonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPokemon = async () => {
            setLoading(true);
            const data = await fetchPokemonDetails(id);
            setPokemon(data);
            setLoading(false);
        };

        loadPokemon();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!pokemon) return <p>Error loading Pokémon</p>;

    return (
        <div className="pokemon-detail">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>
                <strong>Type:</strong> {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
            <p>
                <strong>Height:</strong> {pokemon.height}
            </p>
            <p>
                <strong>Weight:</strong> {pokemon.weight}
            </p>
            <div>
                <h3>Abilities:</h3>
                <ul>
                    {pokemon.abilities.map((item, index) => (
                        <li key={index}>{item.ability.name}</li>
                    ))}
                </ul>
            </div>
            <button onClick={() => navigate(-1)}>← Назад</button>
        </div>
    );
};

export default PokemonDetail;
