// shared/utils/form.utils.ts

export function isInvalid(field: any): boolean {
  return field().touched() && field().errors().length > 0;
}

export function isValid(field: any): boolean {
  return field().touched() && field().errors().length === 0;
}
