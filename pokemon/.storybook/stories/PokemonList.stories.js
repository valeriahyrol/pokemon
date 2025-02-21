import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PokemonList from '../../src/components/PokemonList';

export default {
    title: 'Components/PokemonList',
    component: PokemonList,
};

const Template = (args) => (
    <MemoryRouter>
        <PokemonList {...args} />
    </MemoryRouter>
);

export const DefaultList = Template.bind({});
DefaultList.args = {
};

export const SortedList = Template.bind({});
SortedList.args = {
};
