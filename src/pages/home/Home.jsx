/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import Nav from './components/Nav';

function App() {
	const params = useParams();
	const [loading, setLoading] = useState(false);
	const [event, setEvent] = useState();
	const [logo, setLogo] = useState();

	async function handleLogo(id) {
		setLogo(`https://touchsistemasadmin180243-dev.s3.amazonaws.com/public/logo/${id}.png`);
	}

	async function handleGetEvent(id) {
		setLoading(true);
		const { data } = await axios.get(`https://gjdkij839d.execute-api.us-east-1.amazonaws.com/dev/events/${id}`);
		setEvent(data);
		handleLogo(data.id);
		setLoading(false);
	}

	useEffect(() => {
		if (params.id) handleGetEvent(params.id);
	}, [params]);

	return (
		<div className="leading-normal tracking-normal bg-secondary">
			<Nav />
			<div>
				{loading && <Loading />}
				{logo && (
					<div className="w-3/12 mb-2 sm:mb-0 sm:w-2/12 md:w-1/12">
						<img alt="logo" className="object-scale-down w-full rounded-md" src={logo} />
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
