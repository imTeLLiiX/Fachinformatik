import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { UserRole } from '@/types/user';

export async function getSession(req: NextApiRequest) {
  const token = await getToken({ req });
  return token;
}

export function isAuthenticated(req: NextApiRequest) {
  return !!req.headers.authorization;
}

export function isAuthorized(req: NextApiRequest, allowedRoles: UserRole[]) {
  const userRole = req.headers['x-user-role'] as UserRole;
  return allowedRoles.includes(userRole);
}

export function getUserId(req: NextApiRequest) {
  return req.headers['x-user-id'] as string;
}

export function handleError(res: NextApiResponse, error: any) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}

export function handleUnauthorized(res: NextApiResponse) {
  res.status(401).json({ error: 'Unauthorized' });
}

export function handleForbidden(res: NextApiResponse) {
  res.status(403).json({ error: 'Forbidden' });
} 