import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { linkOptions } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

export default function TestComponent() {
    const heroEnglish = linkOptions([
        {
            to: '/abc',
            label: 'Summary',
        },
        {
            to: '/dashboard/invoices',
            label: 'Invoices',
        },
        {
            to: '/dashboard/users',
            label: 'Users',
        },
    ]);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex flex-col divide-x">
                {heroEnglish.map((option) => {
                    return (
                        <Link
                            {...option}
                            key={option.to}
                            className="p-2 hover:underline hover:underline-offset-2"
                        >
                            {option.label}
                        </Link>
                    );
                })}
                <a
                    href="/abc"
                    className="p-2 hover:underline hover:underline-offset-2"
                >
                    ABC
                </a>
            </div>
        </>
    );
}
