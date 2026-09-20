export type DieColor = 'yellow' | 'green' | 'blue' | 'purple' | 'red'

export type Face = 0 | 1 | 2

export const DIE_FACES: Record<DieColor, readonly Face[]> = {
  yellow: [0, 0, 0, 0, 1, 2],
  green: [0, 0, 0, 1, 1, 2],
  blue: [0, 0, 1, 1, 1, 2],
  purple: [0, 1, 1, 1, 1, 2],
  red: [1, 1, 1, 1, 1, 2],
}

export const DIE_LABELS: Record<DieColor, string> = {
  yellow: 'Yellow',
  green: 'Green',
  blue: 'Blue',
  purple: 'Purple',
  red: 'Red',
}

export const DIE_ORDER: DieColor[] = ['yellow', 'green', 'blue', 'purple', 'red']
