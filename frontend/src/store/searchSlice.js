import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchDocuments } from '../api/client';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async ({ query, maxResults = 10 }, { rejectWithValue }) => {
    try {
      const response = await searchDocuments(query, maxResults);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    summary: '',
    documentsFound: 0,
    processingTime: 0,
    loading: false,
    error: null,
    hasSearched: false,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.summary = '';
      state.documentsFound = 0;
      state.processingTime = 0;
      state.error = null;
      state.hasSearched = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.summary = action.payload.summary;
        state.documentsFound = action.payload.documents_found;
        state.processingTime = action.payload.processing_time;
        state.hasSearched = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to search documents';
        state.hasSearched = true;
      });
  },
});

export const { setQuery, clearResults, clearError } = searchSlice.actions;
export default searchSlice.reducer;
