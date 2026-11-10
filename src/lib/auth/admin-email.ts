/**
 * The single account allowed into /admin. Kept in env (ADMIN_EMAIL) so the
 * address never lands in the public repo. Fails closed when unset. Split from
 * ./admin.ts so the proxy can use it without pulling in `server-only`.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  const admin = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(admin && email && email.toLowerCase() === admin);
}
