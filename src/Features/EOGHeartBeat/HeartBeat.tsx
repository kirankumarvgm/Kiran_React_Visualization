import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const heartBeatQuery = `
query {
 heartBeat
}
`;

export default () => {
  return (
    <Provider value={client}>
      <HeartBeat />
    </Provider>
  );
};

const HeartBeat = () => {
  const dispatch = useDispatch();

  const [result, reexecuteQuery] = useQuery({
    query: heartBeatQuery,
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.hearBeatApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;

    dispatch(actions.heartBeatDataRecevied(data));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return null;
};
