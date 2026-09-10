import { redirect } from 'next/navigation';
import { CONFESSION_CONFIG } from '@/config/confession';

export default function RootPage() {
  redirect(`/${CONFESSION_CONFIG.UNIQUE_SLUG}`);
}
