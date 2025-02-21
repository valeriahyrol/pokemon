import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PokemonPage from '../../src/components//PokemonPage';

export default {
    title: 'Components/PokemonPage',
    component: PokemonPage,
};

const Template = (args) => (
    <MemoryRouter>
        <PokemonPage {...args} />
    </MemoryRouter>
);

export const DefaultPage = Template.bind({});
DefaultPage.args = {
    currentPage: 1,
    searchQuery: '',
    selectedType: '',
    sortOrder: '-',
};

export const SortedPage = Template.bind({});
SortedPage.args = {
    currentPage: 1,
    searchQuery: '',
    selectedType: '',
    sortOrder: 'asc',
};

export const FilteredPage = Template.bind({});
FilteredPage.args = {
    currentPage: 1,
    searchQuery: 'char',
    selectedType: 'fire',
    sortOrder: '-',
};
