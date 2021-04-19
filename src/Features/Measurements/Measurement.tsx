import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';
import Dashboard from './../../components/Dashboard';
import moment from 'moment';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const measurementQuery = `
query($input: MeasurementQuery!) {
  getMeasurements(input: $input) {
     metric,
    at,
    value,
    unit
  }
}
`;

const getMeasurement = (state: IState) => {
  const dataMeasurements = state.measurement;
  return {
    dataMeasurements,
  };
};

export default () => {
  return (
    <Provider value={client}>
      <DataMeasurement />
    </Provider>
  );
};

const DataMeasurement = () => {
  const { current, past } = useSelector((state: IState) => state.heartbeat);
  const MeasurementQuery = {
    metricName: 'tubingPressure',
    after: past,
    before: current,
  };
  const dispatch = useDispatch();
  const measurementData = useSelector(getMeasurement);

  const [result] = useQuery({
    query: measurementQuery,
    variables: { input: MeasurementQuery },
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.measurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMeasurements } = data;
    dispatch(actions.mesurementDataRecevied(getMeasurements));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return null;
};
