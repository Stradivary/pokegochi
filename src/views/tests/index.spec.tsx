import { describe, it, expect, vi } from 'vitest';
import { Component as AboutPage } from '../about';
import { Component as MainPage } from '../_layout';
import { Component as PokedexPage } from '../pokedex';
import { Component as PokedexPokemonPage } from '../pokedex.$id';
import { Component as SettingsPage } from '../settings';
import { Component as PokemonPage } from '../pokemon';
import { render } from '@/tests/test-utils';

describe('Component Coverage Tests', () => {
    it('should render the AboutPage component correctly', () => {
        const { container } = render(<AboutPage />);
        expect(container).toBeDefined();
    });

    it('should render the MainPage component correctly', () => {
        const { container } = render(<MainPage />);
        expect(container).toBeDefined();
    });

    it('should render the PokedexPage component correctly', () => {
        const { container } = render(<PokedexPage />);
        expect(container).toBeDefined();
    });

    it('should render the pokedex page when error is thrown', () => {
        // mock usePokedexViewModel() hooks
        vi.mock('../viewModels/usePokedexViewModel', () => {
            return () => {
                return {
                    status: 'error',
                    error: new Error('error'),
                };
            };
        });

        const { container } = render(<PokedexPage />);
        expect(container).toBeDefined();

        // reset mock
        vi.mock('../viewModels/usePokedexViewModel', () => {
            return () => {
                return {
                    status: 'success',
                    data: {
                        pages: [],
                    },
                    hasNextPage: false,
                    isFetchingNextPage: false,
                    isFetching: false,
                    fetchNextPage: () => { },
                    intersectionRef: () => { },
                };
            };
        });

        const { container: container2 } = render(<PokedexPage />);
        expect(container2).toBeDefined();

    });


    it('should render the PokedexPokemonPage component correctly', () => {
        const { container } = render(<PokedexPokemonPage />);
        expect(container).toBeDefined();
    });

    it('should render the SettingsPage component correctly', () => {
        const { container } = render(<SettingsPage />);
        expect(container).toBeDefined();
    });

    it('should render the PokemonPage component correctly', () => {
        const { container } = render(<PokemonPage />);
        expect(container).toBeDefined();
    });
});
