const API_BASE_URL = "http://localhost:5001/api";

export const fetchPokemonPage = async (page, limit = 12) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon?page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error("Failed to fetch Pokémon");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        return [];
    }
};

export const fetchPokemonDetails = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
        if (!response.ok) throw new Error("Failed to fetch Pokémon details");

        return await response.json();
    } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        return null;
    }
};

export const fetchPokemonTypes = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type`);
        if (!response.ok) throw new Error("Failed to fetch Pokémon types");

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching Pokémon types:", error);
        return [];
    }
};
