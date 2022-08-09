/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import Nav from '../../components/Nav';

function App() {
	const params = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [event, setEvent] = useState();
	const [logo, setLogo] = useState();
	const [phone, setPhone] = useState('');
	const [error, setError] = useState(false);

	function normalizePhone(value) {
		setError(false);
		if (!value) return value;
		const currentValue = value.replace(/[^\d]/g, '');
		const cvLength = currentValue.length;
		if (cvLength < 3) return currentValue;
		if (cvLength < 7) return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2)}`;
		return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2, 7)}-${currentValue.slice(7, 11)}`;
	}

	function handleChangePhone(value) {
		setPhone(normalizePhone(value));
	}

	function handleSubmit(e) {
		console.log(phone)
		e.preventDefault();
		setError(false)
		if (!phone || phone.length < 15) setError(true);
	}

	useEffect(() => {
		if (params.id) {
			setLoading(true);
			fetch(`${process.env.REACT_APP_API}${params.id}`)
				.then((res) => res.json())
				.then(
					(data) => {
						console.log(data);
						setLoading(false);
						if (!data?.id) navigate('/');
						setEvent(data);
						setLogo(`${process.env.REACT_APP_LOGO_BUCKET}${params.id}.png`);
					},
					(err) => {
						console.log(err);
						setLoading(false);
						navigate('/');
					}
				);
		} else {
			navigate('/');
		}
	}, []);

	function isDisabled() {
		if (phone.length < 15) return true
		return false
	}

	return (
		<>
			<Nav />
			<div className="h-screen flex flex-row justify-center items-center">
				{loading && <Loading />}
				{!loading && event && (
					<div className="bg-white w-full mx-4 sm:w-10/12 md:w-6/12 sm:mx-0 p-8 sm:p-8 flex flex-col justify-center items-center gap-4 rounded-lg shadow-lg">
						{logo && <img alt="logo" className="object-scale-down w-6/12 rounded-md" src={logo} />}
						<h1 className="font-bold text-2xl text-center">{event.name}</h1>
						<h2 className="text-2xl">Digite seu Celular</h2>
						<form onSubmit={handleSubmit} className="w-full flex justify-end items-center relative">
							<input
								value={phone || ''}
								onChange={(e) => handleChangePhone(e.target.value)}
								type="tel"
								className={`w-full p-3 text-xl font-bold bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:border-amber-500 focus:outline-none ${ error ? 'border-red-500' : 'border-amber-300'}`}
							/>
							<button type="submit" className="absolute right-2" disabled={isDisabled()}>
								<i className={`bx bxs-phone-outgoing  text-4xl ${ error ? 'text-red-500' : 'text-secondary'}`} />
							</button>
						</form>

						<p className="text-xl">E retire seu copo gratuitamente!</p>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
