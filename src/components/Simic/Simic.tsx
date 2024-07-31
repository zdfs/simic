import Editor from '../Editor/Editor';

import './Simic.css';

function Simic() {
	return (
		<>
			<div className="min-h-screen h-screen flex flex-col border-r border-neutral-600">
				<header className="font-extrabold border-b tracking-tight sm:text-3xl p-4 pb-0">
					<h1>Simic</h1>
					<p className="font-bold text-xs tracking-tight pt-0 pb-2">
						A Poetry Editor
					</p>
				</header>

				<div className="flex flex-1 flex-row overflow-y-hidden">
					<main
						role="main"
						className="flex-1 text-xs p-2 overflow-y-auto"
					>
						<Editor />
					</main>
					<nav className="border-r order-first w-36 sm:w-32 p-2 overflow-y-auto">
						<ul>
							<li>test</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
}

export default Simic;
