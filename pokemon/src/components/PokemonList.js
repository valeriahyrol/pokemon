import React, { useState, useEffect } from "react";
import PokemonPage from "./PokemonPage";
import { fetchPokemonTypes } from "../api/pokemonApi";
import "../App.css";

const PokemonList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [sortOrder, setSortOrder] = useState("-");
    const [types, setTypes] = useState([]);
    const [loadingTypes, setLoadingTypes] = useState(true);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(1010 / itemsPerPage);

    useEffect(() => {
        const loadTypes = async () => {
            setLoadingTypes(true);
            const data = await fetchPokemonTypes();
            setTypes(data);
            setLoadingTypes(false);
        };

        loadTypes();
    }, []);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <div className="pokemon-container">
            <h2>Pokémon List</h2>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                {loadingTypes ? (
                    <p className="loading-text">Loading types...</p>
                ) : (
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Types</option>
                        {types.map((type) => (
                            <option key={type.name} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                )}

                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="filter-select"
                >
                    <option value="-">-</option>
                    <option value="asc">Sort A-Z</option>
                    <option value="desc">Sort Z-A</option>
                </select>
            </div>

            <PokemonPage
                currentPage={currentPage}
                searchQuery={searchQuery}
                selectedType={selectedType}
                sortOrder={sortOrder}
            />

            <div className="pagination">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    ← Prev
                </button>
                <span className="pagination-text">
          Page {currentPage} of {totalPages}
        </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default PokemonList;
