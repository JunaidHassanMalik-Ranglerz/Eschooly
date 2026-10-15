import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApiErrorMessage} from '../../utils/apiError';
import {
  getChildDashboard,
  getParentHome,
  mapDashboard,
  mapParentHome,
} from '../../services/parentService';

const initialState = {
  parent: null,
  children: [],
  selectedChildId: null,
  dashboard: null,
  homeLoading: false,
  dashboardLoading: false,
  error: null,
};

const rejectMessage = error => ({
  message: getApiErrorMessage(error),
  status: error?.response?.status ?? null,
});

const isFailedBody = body =>
  Boolean(body && (body.success === false || body.status === false));

export const fetchParentHome = createAsyncThunk(
  'parentHome/fetchParentHome',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getParentHome();
      const body = response?.data;
      console.log('body', body) 
      if (isFailedBody(body)) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load home.',
          status: response?.status ?? null,
        });
      }
      return mapParentHome(body);
    } catch (error) {
      return rejectWithValue(rejectMessage(error));
    }
  },
);

export const fetchChildDashboard = createAsyncThunk(
  'parentHome/fetchChildDashboard',
  async (childId, {getState, rejectWithValue}) => {
    const requestedId = String(childId);
    try {
      const response = await getChildDashboard(requestedId);
      const currentId = String(getState().parentHome.selectedChildId || '');
      if (currentId !== requestedId) {
        return rejectWithValue({stale: true, childId: requestedId});
      }

      const body = response?.data;
      if (isFailedBody(body)) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load dashboard.',
          status: response?.status ?? null,
          childId: requestedId,
        });
      }

      const data = body?.data && typeof body.data === 'object' ? body.data : body;
      const dashboard = data?.dashboard == null ? data : data.dashboard;

      return {
        childId: requestedId,
        dashboard: mapDashboard(dashboard),
      };
    } catch (error) {
      const currentId = String(getState().parentHome.selectedChildId || '');
      if (currentId !== requestedId) {
        return rejectWithValue({stale: true, childId: requestedId});
      }
      return rejectWithValue({
        ...rejectMessage(error),
        childId: requestedId,
      });
    }
  },
);

const parentHomeSlice = createSlice({
  name: 'parentHome',
  initialState,
  reducers: {
    resetParentHome: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchParentHome.pending, state => {
        state.homeLoading = true;
        state.error = null;
      })
      .addCase(fetchParentHome.fulfilled, (state, action) => {
        state.homeLoading = false;
        state.parent = action.payload.parent;
        state.children = action.payload.children;
        state.selectedChildId = action.payload.selectedChildId;
        state.dashboard = action.payload.dashboard;
        state.error = null;
      })
      .addCase(fetchParentHome.rejected, (state, action) => {
        state.homeLoading = false;
        state.error = action.payload?.message || 'Unable to load home.';
      })
      .addCase(fetchChildDashboard.pending, (state, action) => {
        state.selectedChildId = String(action.meta.arg);
        state.dashboardLoading = true;
        state.error = null;
      })
      .addCase(fetchChildDashboard.fulfilled, (state, action) => {
        if (String(state.selectedChildId) !== String(action.payload.childId)) {
          return;
        }
        state.dashboardLoading = false;
        state.dashboard = action.payload.dashboard;
        state.error = null;
      })
      .addCase(fetchChildDashboard.rejected, (state, action) => {
        if (String(state.selectedChildId) !== String(action.meta.arg)) {
          return;
        }
        state.dashboardLoading = false;
        if (!action.payload?.stale) {
          state.dashboard = null;
          state.error = action.payload?.message || 'Unable to load dashboard.';
        }
      });
  },
});

export const {resetParentHome} = parentHomeSlice.actions;
export default parentHomeSlice.reducer;
