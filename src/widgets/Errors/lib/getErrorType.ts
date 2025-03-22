import { AxiosError } from 'axios';

export function isNotFoundError(error: unknown): boolean {
  return error instanceof AxiosError && Number(error.status) === 404;
}
