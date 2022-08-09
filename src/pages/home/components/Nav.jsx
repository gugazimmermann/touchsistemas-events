import { Link } from 'react-router-dom';
import LogoIcon from '../../../images/LogoIcon';

export default function Nav() {
	return (
		<nav id="header" className="fixed w-full z-30 top-0 bg-white shadow">
			<div className="flex flex-row items-center justify-between align-middle py-2 px-4 w-full container mx-auto">
				<Link
					className="flex flex-row items-center text-primary no-underline hover:no-underline font-bold text-2xl lg:text-2xl"
					to="/"
				>
					<LogoIcon styles="h-10 w-10" />
					{process.env.REACT_APP_TITLE}
				</Link>
			</div>
		</nav>
	);
}
