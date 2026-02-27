import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducer';
import movieApi from '../api/movieAPI';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialMovieState);

    const fetchMovies = useCallback(async (params = {}) => {
        dispatch({ type: 'START_LOADING' });
        try {
            // Build query string for filtering and sorting
            let endpoint = '/movies';
            const queryParams = new URLSearchParams();

            if (params.id) queryParams.append('id', params.id);
            if (params.title) queryParams.append('title_like', params.title);
            if (params.genreId) queryParams.append('genreId', params.genreId);
            if (params.sortBy) {
                queryParams.append('_sort', params.sortBy);
                queryParams.append('_order', params.order || 'asc');
            }

            const queryString = queryParams.toString();
            if (queryString) endpoint += `?${queryString}`;

            const response = await movieApi.get(endpoint);
            dispatch({ type: 'SET_MOVIES', payload: response.data });
        } catch (error) {
            console.error("Error fetching movies:", error);
            dispatch({ type: 'SET_MOVIES', payload: [] });
        }
    }, [dispatch]);

    const fetchGenres = useCallback(async () => {
        try {
            const response = await movieApi.get('/genres');
            dispatch({ type: 'SET_GENRES', payload: response.data });
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    }, [dispatch]);

    const confirmDelete = useCallback(async (id) => {
        dispatch({ type: 'CLOSE_DELETE_MODAL' });
        dispatch({ type: 'START_LOADING' });
        try {
            await movieApi.delete(`/movies/${id}`);
            fetchMovies();
        } catch (error) {
            console.error("Error deleting movie:", error);
            fetchMovies();
        }
    }, [fetchMovies]);

    const handleCreateOrUpdate = useCallback(async (dataToSend, isEditingNow, isEditingIdNow) => {
        dispatch({ type: 'START_LOADING' });
        try {
            if (isEditingNow) {
                await movieApi.put(`/movies/${isEditingIdNow}`, dataToSend);
            } else {
                // Ensure ID is unique or let json-server handle it
                await movieApi.post('/movies', dataToSend);
            }
            dispatch({ type: 'RESET_FORM' });
            fetchMovies();
            return { ok: true };
        } catch (error) {
            console.error("Error creating/updating movie:", error);
            fetchMovies();
            return { ok: false };
        }
    }, [fetchMovies]);

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, [fetchMovies, fetchGenres]);

    const dispatchValue = {
        dispatch,
        fetchMovies,
        fetchGenres,
        confirmDelete,
        handleCreateOrUpdate
    };

    return (
        <MovieStateContext.Provider value={state}>
            <MovieDispatchContext.Provider value={dispatchValue}>
                {children}
            </MovieDispatchContext.Provider>
        </MovieStateContext.Provider>
    );
};
