import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useTypeGetAll, useTypeGetByName } from './typesDataSource';
import { describe, expect, it } from 'vitest';
import { act } from 'react-dom/test-utils';

const mock = new MockAdapter(axios);
const queryClient = new QueryClient();

describe('Type Data Source', () => {
    it('should return data when useTypeGetAll is called', async () => {
        const data = { results: [{ name: 'test-types', url: 'test-url' }] };
        mock.onGet('/types').reply(200, data);

        const wrapper = ({ children }) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
        const { result } = renderHook(() => useTypeGetAll({ offset: 0, limit: 10 }), { wrapper });

        act(() => {
           
            waitFor(() => result.current.isSuccess);

        });
        expect(result.current.data).toEqual(undefined);
    });

    it('should return data when useTypeGetByName is called', async () => {
        const data = { name: 'test-types', url: 'test-url' };
        mock.onGet('/types/test-types').reply(200, data);

        const wrapper = ({ children }) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
        const { result } = renderHook(() => useTypeGetByName('test-types'), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(undefined);
    });
});