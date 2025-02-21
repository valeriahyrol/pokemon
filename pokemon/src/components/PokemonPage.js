import React, { useState, useEffect } from "react";
import { fetchPokemonPage } from "../api/pokemonApi";
import { useNavigate } from "react-router-dom";
import "../App.css";

const PokemonPage = ({ currentPage, searchQuery, selectedType, sortOrder }) => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPokemon = async () => {
            setLoading(true);
            const data = await fetchPokemonPage(currentPage);
            setPokemon(data);
            setLoading(false);
        };

        loadPokemon();
    }, [currentPage]);

    // Фільтрація покемонів за пошуковим запитом та обраним типом
    let filteredPokemon = pokemon.filter((poke) =>
        poke.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedType === "" || poke.types.some((t) => t.type.name === selectedType))
    );

    // Сортування за ім'ям, якщо вибрано
    if (sortOrder !== "-") {
        filteredPokemon = filteredPokemon.sort((a, b) =>
            sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );
    }

    return (
        <div className="pokemon-grid">
            {loading ? (
                <p className="loading-text">Loading Pokémon...</p>
            ) : filteredPokemon.length === 0 ? (
                <p className="loading-text">No Pokémon match your search or filter</p>
            ) : (
                filteredPokemon.map((poke) => (
                    <div
                        key={poke.id}
                        className="pokemon-card"
                        onClick={() => navigate(`/pokemon/${poke.id}`)}
                    >
                        <img
                            src={poke.sprites?.front_default || "https://via.placeholder.com/96"}
                            alt={poke.name}
                        />
                        <h3>{poke.name}</h3>
                        <p>Type: {poke.types.map((t) => t.type.name).join(", ")}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default PokemonPage;
