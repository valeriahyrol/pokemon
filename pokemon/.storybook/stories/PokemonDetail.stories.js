import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonDetail from '../../src/components/PokemonDetail';

const dummyPokemon = {
    name: 'Bulbasaur',
    sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    height: 7,
    weight: 69,
    abilities: [{ ability: { name: 'overgrow' } }, { ability: { name: 'chlorophyll' } }]
};

const MockPokemonDetail = () => (
    <div className="pokemon-detail">
        <h2>{dummyPokemon.name}</h2>
        <img src={dummyPokemon.sprites.front_default} alt={dummyPokemon.name} />
        <p>
            <strong>Type:</strong> {dummyPokemon.types.map((t) => t.type.name).join(", ")}
        </p>
        <p>
            <strong>Height:</strong> {dummyPokemon.height}
        </p>
        <p>
            <strong>Weight:</strong> {dummyPokemon.weight}
        </p>
        <div>
            <h3>Abilities:</h3>
            <ul>
                {dummyPokemon.abilities.map((item, index) => (
                    <li key={index}>{item.ability.name}</li>
                ))}
            </ul>
        </div>
        <button>← Назад</button>
    </div>
);

export default {
    title: 'Components/PokemonDetail',
    component: MockPokemonDetail,
};

const Template = () => (
    <MemoryRouter initialEntries={['/pokemon/1']}>
        <Routes>
            <Route path="/pokemon/:id" element={<MockPokemonDetail />} />
        </Routes>
    </MemoryRouter>
);

// Стандартна історія (DefaultDetail)
export const DefaultDetail = Template.bind({});
DefaultDetail.storyName = "Standard Layout";

export const AlternateDetail = () => (
    <MemoryRouter initialEntries={['/pokemon/1']}>
        <Routes>
            <Route
                path="/pokemon/:id"
                element={
                    <div className="pokemon-detail alternate">
                        {/* Спочатку деталі, потім зображення */}
                        <div>
                            <h2>{dummyPokemon.name}</h2>
                            <p>
                                <strong>Height:</strong> {dummyPokemon.height}
                            </p>
                            <p>
                                <strong>Weight:</strong> {dummyPokemon.weight}
                            </p>
                            <p>
                                <strong>Type:</strong> {dummyPokemon.types.map((t) => t.type.name).join(", ")}
                            </p>
                            <div>
                                <h3>Abilities:</h3>
                                <ul>
                                    {dummyPokemon.abilities.map((item, index) => (
                                        <li key={index}>{item.ability.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <img src={dummyPokemon.sprites.front_default} alt={dummyPokemon.name} />
                        </div>
                        <button>← Назад</button>
                    </div>
                }
            />
        </Routes>
    </MemoryRouter>
);
AlternateDetail.storyName = "Alternate Layout";
