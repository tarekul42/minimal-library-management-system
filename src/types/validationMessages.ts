export interface IValidationMessages {
  quantity: {
    min: string;
    max: (count: number) => string;
  };
}
