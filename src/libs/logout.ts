import { queryClient } from '@/providers/QueryProvider';
import storage from './storage';

const cleanStorage = () => {
  storage.clear();
  queryClient.removeQueries();
};

export function navigateToLogin() {
  cleanStorage();

  window.location.replace('/auth/signin');
}
