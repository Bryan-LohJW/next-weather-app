// const { MongoClient } = require('mongodb');

import Head from 'next/head';

import LocationList from '@/components/location/LocationList';
import { LocationType } from '@/models/types';
import { useContext, useEffect } from 'react';
import { LocationContext } from '@/store/location-context';
import Content from '@/components/ui/Content';
import classes from './index.module.css';

const Home = () => {
	const { locations, setLocations } = useContext(LocationContext);

	useEffect(() => {
		console.log('useEffect Triggered');
		async function fetchData() {
			const response = await fetch('/api/locations');
			const data = await response.json();
			if (data.locationArray.length === locations.length) {
				return;
			}
			setLocations(data.locationArray);
		}
		fetchData();
	}, [locations, setLocations]);
	return (
		<>
			<Head>
				<title>Weather App</title>
				<meta
					name="description"
					content="Weather app for your location"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Content>
				<LocationList />
			</Content>
		</>
	);
};

export default Home;
