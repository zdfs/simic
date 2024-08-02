'use client';
import { faker } from '@faker-js/faker';
import { Archive, EllipsisVertical, Pencil, Trash, User } from 'lucide-react';
import Avatar from '@tailus-ui/Avatar';
import Button from '@tailus-ui/Button';
import DropdownMenu from '@tailus-ui/Dropdown';
import { Badge } from '@tailus-ui/Badge';
import { Text, Title } from '@tailus-ui/typography';
import Card from '@tailus-ui/Card';

interface order {
	id: number;
	name: string;
	email: string;
	avatarUrl: string;
	status?: string;
	date?: string;
	product: string;
	revenue?: string;
	orders?: string;
	checked?: boolean;
}

const orders: order[] = Array.from({ length: 8 }, (_, i) => ({
	id: i,
	name: faker.person.fullName(),
	email: faker.internet.email(),
	avatarUrl: faker.image.avatar(),
	date: faker.date.past().toLocaleDateString('en-US'),
	status: '2',
	product: faker.commerce.productName(),
	revenue: `$${faker.finance.amount(100, 1000, 2)}`,
	orders: faker.number.int(20).toString(),
}));

const colors = [
	'primary',
	'secondary',
	'accent',
	'danger',
	'warning',
	'success',
	'info',
	'gray',
];
type Color =
	| 'primary'
	| 'secondary'
	| 'accent'
	| 'danger'
	| 'warning'
	| 'success'
	| 'info'
	| 'gray';

function getRandomColor(): Color {
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex] as Color;
}

function getInitials(name: string): string {
	const parts = name.split(' ');
	let initials = '';
	for (let i = 0; i < Math.min(2, parts.length); i++) {
		if (parts[i].length > 0 && parts[i] !== '') {
			initials += parts[i][0];
		}
	}
	return initials.toUpperCase();
}

export const Orders = () => {
	return (
		<Card variant="outlined" className="overflow-x-auto lg:overflow-clip">
			<div className="sticky left-0 mb-6">
				<Title as="h2" size="lg" weight="medium">
					Poems
				</Title>
				<Text size="sm" className="mb-0 mt-1">
					New users by First user primary channel group (Default
					Channel Group)
				</Text>
			</div>
			<table className="min-w-max table-auto border-collapse space-y-1 sm:min-w-full">
				<thead>
					<tr className="text-sm text-[--title-text-color] *:bg-[--ui-soft-bg] *:p-3 *:text-left *:font-medium">
						<th className="rounded-l-[--card-radius]">Date</th>
						<th>Revision</th>
						<th>Author</th>
						<th>Title</th>
						<th className="rounded-r-[--card-radius]"></th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order, index) => (
						<tr
							className="group items-center border-b text-sm text-[--body-text-color] *:p-3 hover:bg-gray-50 has-[[data-state='checked']]:bg-[--ui-soft-bg] has-[[data-state='open']]:bg-gray-50 dark:hover:bg-gray-500/5 dark:has-[[data-state='open']]:bg-gray-500/5"
							key={order.id}
						>
							<td>{order.date}</td>
							<td>
								<Badge
									variant="soft"
									intent="success"
									size="xs"
									className="bg-opacity-50"
								>
									{order.status}
								</Badge>
							</td>
							<td>
								<div className="flex items-center gap-3">
									<Avatar.Root size="xxs">
										<Avatar.Image
											src={order.avatarUrl}
											alt={order.name}
										/>
										<Avatar.Fallback
											variant="soft"
											intent={getRandomColor()}
											className="text-sm"
										>
											{getInitials(order.name)}
										</Avatar.Fallback>
									</Avatar.Root>
									{order.name}
								</div>
							</td>
							<td>{order.product}</td>
							<td>
								<DropdownMenu.Root modal={false}>
									<DropdownMenu.Trigger asChild>
										<Button.Root
											variant="ghost"
											size="xs"
											intent="gray"
											className="ml-auto"
										>
											<Button.Icon size="xs" type="only">
												<EllipsisVertical />
											</Button.Icon>
										</Button.Root>
									</DropdownMenu.Trigger>
									<DropdownMenu.Portal>
										<DropdownMenu.Content
											data-shade="glassy"
											intent="gray"
											mixed
											variant="soft"
											side="bottom"
											sideOffset={6}
											align="end"
										>
											<DropdownMenu.Item>
												<DropdownMenu.Icon>
													<User className="size-4" />
												</DropdownMenu.Icon>
												View profile
											</DropdownMenu.Item>
											<DropdownMenu.Item>
												<DropdownMenu.Icon>
													<Pencil className="size-4" />
												</DropdownMenu.Icon>
												Edit
											</DropdownMenu.Item>
											<DropdownMenu.Item>
												<DropdownMenu.Icon>
													<Archive className="size-4" />
												</DropdownMenu.Icon>
												Archive
											</DropdownMenu.Item>
											<DropdownMenu.Separator />
											<DropdownMenu.Item intent="danger">
												<DropdownMenu.Icon>
													<Trash className="size-4" />
												</DropdownMenu.Icon>
												Delete
											</DropdownMenu.Item>
										</DropdownMenu.Content>
									</DropdownMenu.Portal>
								</DropdownMenu.Root>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Card>
	);
};

export default Orders;
