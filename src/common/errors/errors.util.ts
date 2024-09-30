type type = 'string' | 'email' | 'date' | 'boolean' | 'number';

export const passwordMatch = /^(?=.*[0-9])(?=.*[a-zA-Z]).+$/;

export const typeErrorMessage = (label: string, type: type) =>
  `El campo ${label} debe ser ${type}`;

export const dateErrorMessage = (label: string) =>
  `El campo ${label} deber estar en el formato YYYY-MM-DD`;

export const lengthErrorMessage = (
  label: string,
  type: 'min' | 'max',
  length: number,
) => {
  const typeLocal = type == 'min' ? 'mínimo' : 'máximo';
  return `El campo ${label} debe tener ${typeLocal} ${length} caracteres`;
};

export const passwordError = (label: string) =>
  `El campo ${label} debe contener al menos un número y una letra`;
