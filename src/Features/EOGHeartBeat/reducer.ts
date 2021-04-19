import { createSlice, PayloadAction } from 'redux-starter-kit';

export type HeartBeatMeasure = {
  heartBeat: number;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  current: 0,
  past: 0,
};

const slice = createSlice({
  name: 'heartbeat',
  initialState,
  reducers: {
    heartBeatDataRecevied: (state, action: PayloadAction<HeartBeatMeasure>) => {
      const { heartBeat } = action.payload;
      state.current = heartBeat;
      state.past = heartBeat - 1800000; // to get legacy data
    },
    hearBeatApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
