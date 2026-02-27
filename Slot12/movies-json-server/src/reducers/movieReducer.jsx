export const initialMovieState = {
    movies: [],
    genres: [],
    loading: false,
    isEditing: null,
    currentMovie: { poster: '', title: '', description: '', genreId: '', duration: '', year: '', country: '' },
    showModal: false,
    showDeleteModal: false,
    movieToDelete: null
};

export const movieReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return { ...state, movies: action.payload, loading: false };

        case 'SET_GENRES':
            return { ...state, genres: action.payload };

        case 'START_LOADING':
            return { ...state, loading: true };

        case 'UPDATE_FIELD':
            return {
                ...state,
                currentMovie: { ...state.currentMovie, [action.payload.name]: action.payload.value }
            };

        case 'OPEN_ADD_MODAL':
            return {
                ...state,
                currentMovie: initialMovieState.currentMovie,
                isEditing: null,
                showModal: true
            };

        case 'OPEN_EDIT_MODAL':
            return {
                ...state,
                currentMovie: action.payload,
                isEditing: action.payload.id,
                showModal: true
            };

        case 'CLOSE_MODAL':
            return {
                ...state,
                currentMovie: initialMovieState.currentMovie,
                isEditing: null,
                showModal: false
            };

        case 'OPEN_DELETE_MODAL':
            return {
                ...state,
                movieToDelete: action.payload,
                showDeleteModal: true
            };

        case 'CLOSE_DELETE_MODAL':
            return {
                ...state,
                movieToDelete: null,
                showDeleteModal: false
            };

        case 'RESET_FORM':
            return {
                ...state,
                currentMovie: initialMovieState.currentMovie,
                isEditing: null,
                showModal: false,
            };

        default:
            return state;
    }
};
