// PokedexPage.js
import { ActionIcon, Button, Center, Group, Image, SimpleGrid, Stack, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import React from 'react';
import CardAddPokemon from '../components/CardPokemonAdd';
import { pokemonData } from '../utils/constants';
import usePokedexViewModel from '../viewModels/usePokedexViewModel'; // Import the custom hook

const PokedexPage = () => {

    const binding = usePokedexViewModel(); // Use the custom hook

    if (binding?.status === 'error') {
        return <Title>Error: {binding?.error?.message}</Title>;
    }

    return (
        <Stack>
            <Title order={1}>Pokedex</Title>
            <Group justify="space-between" mb={45}>
                <Group>
                    {pokemonData?.map(({ type, color, img }: { type: string, color: string, img: string; }, index: number) => {
                        const isSelected = type === binding.selectedType;
                        return (
                            <Tooltip key={index} label={type} position="bottom" withArrow>
                                <ActionIcon onClick={() => binding.setType(type)} color={color} c="white" size={isSelected ? "md" : "sm"} radius="xl" variant={isSelected ? "filled" : "subtle"}>
                                    <Image src={img} alt={type} />
                                </ActionIcon>
                            </Tooltip>
                        );
                    })}
                </Group>
                <TextInput leftSection={<MagnifyingGlass />} />
            </Group>

            <SimpleGrid mt={32} verticalSpacing={56} spacing={12} cols={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}>
                {binding?.data?.pages?.map((page: { results: { name: string; }[]; }, index: number) => (
                    <React.Fragment key={index + '- page'}>
                        {page?.results?.map(({ name }: { name: string; }) => (
                            <CardAddPokemon pokemonName={name} />
                        ))}
                    </React.Fragment>
                ))}
            </SimpleGrid>
            <Center>
                <Button
                    ref={binding?.intersectionRef} // Use the intersectionRef from the custom hook
                    onClick={() => binding?.fetchNextPage()}
                    loading={binding?.isFetchingNextPage}
                    disabled={!binding?.hasNextPage}
                >
                    {binding?.isFetchingNextPage ? 'Menampilkan lebih bunknownak...' : binding?.hasNextPage ? 'Tampilkan lebih bunknownak' : 'Semua Pokemon ditampilkan'}
                </Button>
            </Center>
            <Center>
                <Text>{binding?.isFetching && !binding?.isFetchingNextPage ? 'Menunggu...' : null}</Text>
            </Center>
        </Stack>
    );
};

PokedexPage.displayName = 'PokedexPage';

export const Component = PokedexPage; 
