import { AxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (Number(error.status) === 404) {
      return 'Requested data was not found';
    }
  }

  return 'Unknown error has occurred. Reload the page and try again.';
}
