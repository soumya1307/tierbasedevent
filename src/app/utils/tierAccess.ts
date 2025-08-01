export const tierLevels = {
  Free: 0,
  Silver: 1,
  Gold: 2,
  Platinum: 3,
};

export function canAccess(userTier: keyof typeof tierLevels, eventTier: keyof typeof tierLevels): boolean {
  return tierLevels[userTier] >= tierLevels[eventTier];
}