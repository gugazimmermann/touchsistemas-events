import NotFoundImg from '../../images/404.svg';

function NotFound() {
	return (
		<div className="container bg-white mx-auto">
			<main className="flex h-screen justify-center items-center">
				<div className="flex flex-col w-full items-center text-5xl text-primary">
					<h1 data-testid="title" className="mb-4">
						Not Found
					</h1>
					<img src={NotFoundImg} alt="not found" className="max-w-sm" />
				</div>
			</main>
		</div>
	);
}

export default NotFound;
