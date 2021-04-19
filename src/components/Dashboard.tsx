import React from 'react';
import { useSelector } from 'react-redux';
import { Measurement } from '../Features/Measurements/reducer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from './CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelect from './MetricSelect';
import DataMeasurement from '../Features/Measurements/Measurement';
const useStyles = makeStyles({
  card: {
    margin: '2% 2%',
  },
});
const Dashboard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Dashboard" />
      <DataMeasurement />
      <MetricSelect />
      <CardContent>Dashboard goes here</CardContent>
    </Card>
  );
};

export default Dashboard;
