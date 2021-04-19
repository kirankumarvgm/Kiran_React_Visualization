import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const metricQuery = `
query {
 getMetrics
}
`;

export default () => {
  return (
    <Provider value={client}>
      <MetricsData />
    </Provider>
  );
};

const MetricsData = () => {
  const dispatch = useDispatch();

  const [result, reexecuteQuery] = useQuery({
    query: metricQuery,
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;

    dispatch(actions.metricDataRecevied(data));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return null;
};
