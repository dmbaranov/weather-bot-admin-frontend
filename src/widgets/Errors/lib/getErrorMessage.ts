import { isNotFoundError } from './getErrorType';

export function getErrorMessage(error: unknown): string {
  if (isNotFoundError(error)) {
    return 'Requested data was not found';
  }

  return 'Unknown error has occurred. Reload the page and try again.';
}
