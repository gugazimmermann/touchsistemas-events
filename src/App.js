import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

const NotFound = lazy(() => import('./pages/not-found/NotFound'));
const Home = lazy(() => import('./pages/home/Home'));

function App() {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/:id" element={<Home />} />
			</Routes>
		</Suspense>
	);
}

export default App;
