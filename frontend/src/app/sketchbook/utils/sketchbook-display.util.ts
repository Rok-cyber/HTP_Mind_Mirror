export type SketchbookImageType = 'house' | 'tree' | 'person' | 'extra';

export interface SketchbookTypeOption<TValue extends number | string = number> {
  value: TValue;
  label: string;
}

export const sketchbookImageTypeOptions: readonly SketchbookTypeOption<SketchbookImageType>[] = [
  { value: 'house', label: '집' },
  { value: 'tree', label: '나무' },
  { value: 'person', label: '사람' },
  { value: 'extra', label: '추가' }
];

export const uploadSketchbookTypeOptions: readonly SketchbookTypeOption<number>[] = [
  { value: 1, label: '영업용' },
  { value: 2, label: '성인용' },
  { value: 3, label: '아동용' },
  { value: 4, label: '청소년용' },
  { value: 5, label: '노인용' }
];

export const editableSketchbookTypeOptions: readonly SketchbookTypeOption<number>[] = [
  ...uploadSketchbookTypeOptions,
  { value: 6, label: '유치원용' }
];

export const editableSketchbookTypeStringOptions: readonly SketchbookTypeOption<string>[] = editableSketchbookTypeOptions.map((option) => ({
  value: String(option.value),
  label: option.label
}));

const sketchbookTypeLabels: Readonly<Record<number, string>> = {
  0: '미지정',
  ...Object.fromEntries(editableSketchbookTypeOptions.map((option) => [option.value, option.label]))
};

export function getSketchbookTypeLabel(type: number | string): string {
  const numericType = Number(type);

  if (Number.isInteger(numericType) && numericType in sketchbookTypeLabels) {
    return sketchbookTypeLabels[numericType];
  }

  return `유형 ${type}`;
}

export function getSketchbookImageTypeLabel(type: SketchbookImageType): string {
  return sketchbookImageTypeOptions.find((option) => option.value === type)?.label ?? type;
}

export function isSketchbookImageType(value: string): value is SketchbookImageType {
  return sketchbookImageTypeOptions.some((type) => type.value === value);
}
