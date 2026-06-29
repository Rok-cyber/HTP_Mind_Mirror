export function getSafeAuthRedirect(rawRedirect: string | null | undefined, allowAdmin = false): string | null {
  const redirect = rawRedirect?.trim();

  if (!redirect || !redirect.startsWith('/') || redirect.startsWith('//')) {
    return null;
  }

  if (!allowAdmin && redirect.startsWith('/admin')) {
    return null;
  }

  if (redirect.startsWith('/login') || redirect.startsWith('/signup')) {
    return null;
  }

  return redirect;
}
