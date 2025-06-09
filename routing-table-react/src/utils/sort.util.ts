export function compareIP(a: string, b: string): number {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);

  for (let i = 0; i < 4; i++) {
    if (aParts[i] !== bParts[i]) return aParts[i] - bParts[i];
  }

  return 0;
}

export function compareString(a: string, b: string): number {
  return a.localeCompare(b);
}