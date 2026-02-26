export const extractTokenFromHeader = (
  authorizationHeader: string | undefined,
): string | undefined => {
  if (!authorizationHeader) return undefined;

  const [type, token] = authorizationHeader.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    throw new Error('Invalid token type');
  }

  return token;
};
