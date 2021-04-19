import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = {
  getMetrics: [];
};

export type ApiErrorAction = {
  error: string;
};
const metricData: Array<Metrics> = [];
const initialState = {
  getMetrics: metricData,
};

const slice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    metricDataRecevied: (state, action: PayloadAction<Metrics>) => {
      const { getMetrics } = action.payload;
      state.getMetrics = getMetrics;
    },
    metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
