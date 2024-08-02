import { BrandIcon } from '../utilities/Brand';
import { Home, Inbox, Menu, Settings, Store, Users, X } from 'lucide-react';
import { Caption, Text, Title } from '@tailus-ui/typography';
import { useState } from 'react';
import { Search } from '../Search';
import Card from '@tailus-ui/Card';
import Progress from '@tailus-ui/Progress';
import Button from '@tailus-ui/Button';
import { WorkspaceIcon } from '../utilities/WorkspaceIcon';
import { twMerge } from 'tailwind-merge';
import * as LinkList from '../LinkList';
import * as Link from '../Link';
import ScrollArea from '@tailus-ui/ScrollArea';
import { UserDropdown } from '../UserDropdown';

import { StackedCards } from '../dashboard/Overview';
import Orders from '../dashboard/OrdersTable';
import { TwoAreasChart } from '../dashboard/AreaCharts';
import { SimpleBarChart } from '../dashboard/BarChart';
import { Traffic } from '../dashboard/Traffic';
import { StackedAreaChart } from '../dashboard/StackedAreas';
import Editor from '../Editor/Editor';

function Simic() {
	const [isBannerVisible, setIsBannerVisible] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className="w-full lg:flex lg:[grid-template-columns:auto_1fr]">
			<aside
				className={twMerge(
					'invisible fixed inset-y-0 top-0 flex h-screen w-fit origin-top scale-[0.98] overflow-hidden opacity-0 transition-all duration-300 lg:visible lg:scale-100 lg:opacity-100',
					isMenuOpen && 'visible scale-100 opacity-100'
				)}
			>
				<div className="flex w-72 flex-col gap-4 px-6 py-4">
					<div className="flex flex-row">
						<div className="flex w-10">
							<BrandIcon className="mx-auto" />
						</div>
						<div className="flex w-40 pt-1">
							<Text weight="bold">Simic</Text>
						</div>
					</div>
					<Search />
					<ScrollArea.Root className="-mx-1 -my-4">
						<ScrollArea.Viewport className="w-full px-1 py-4">
							<div className="space-y-1">
								<Link.Root link="#" isActive>
									<Link.Icon>
										<Home />
									</Link.Icon>
									<Link.Label>Home</Link.Label>
								</Link.Root>
								<Link.Root link="#">
									<Link.Icon>
										<Users />
									</Link.Icon>
									<Link.Label>Authors</Link.Label>
								</Link.Root>
								<Link.Root link="#">
									<Link.Icon>
										<Settings />
									</Link.Icon>
									<Link.Label>Settings</Link.Label>
								</Link.Root>
							</div>
							<div className="mt-4">
								<Caption className="mx-2">Notebooks</Caption>
								<div className="mt-4 space-y-1">
									<Link.Root link="#">
										<Link.Icon>
											<WorkspaceIcon intent="primary" />
										</Link.Icon>
										<Link.Label>Drafts</Link.Label>
									</Link.Root>
									<Link.Root link="#">
										<Link.Icon>
											<WorkspaceIcon intent="secondary" />
										</Link.Icon>
										<Link.Label>Father, God</Link.Label>
									</Link.Root>
									<Link.Root link="#">
										<Link.Icon>
											<WorkspaceIcon intent="accent" />
										</Link.Icon>
										<Link.Label>Collection #2</Link.Label>
									</Link.Root>
								</div>
							</div>
						</ScrollArea.Viewport>
						<ScrollArea.Scrollbar orientation="vertical" />
					</ScrollArea.Root>
					<div className="mt-auto h-fit space-y-4">
						<UserDropdown />
					</div>
				</div>
			</aside>
			<main
				data-shade="900"
				className={twMerge(
					'relative h-screen overflow-auto border-x bg-[--ui-bg] transition-transform duration-300 lg:ml-auto lg:mr-1 lg:mt-1 lg:h-[calc(100vh-4px)] lg:w-[calc(100vw-18rem)] lg:rounded-t-[--card-radius] lg:border-t lg:shadow-md lg:shadow-gray-600/10',
					isMenuOpen && 'translate-x-72 lg:translate-x-0'
				)}
			>
				<div className="feedback-bg sticky top-0 z-10 flex items-center justify-between border-b px-6 py-3 lg:rounded-t-[--card-radius] lg:py-4">
					<div className="flex items-center gap-2">
						<Button.Root
							size="sm"
							variant="ghost"
							intent="gray"
							className="-ml-2 focus:bg-transparent lg:hidden dark:focus:bg-transparent"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<Button.Icon type="only">
								<Menu />
							</Button.Icon>
						</Button.Root>
						<Title size="base" weight="medium">
							Home
						</Title>
					</div>
				</div>

				<div className="p-6 space-y-6">
					<Editor />
					<br /> <br />
					<Orders />
				</div>
			</main>
		</div>
	);
}

export default Simic;
