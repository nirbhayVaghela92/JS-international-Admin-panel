import { routes } from '@/constants/routes';
import { redirect } from 'next/navigation';

export default function NotFound() {
  redirect(routes.dashboard);
}


