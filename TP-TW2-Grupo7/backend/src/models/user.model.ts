export interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

// Simulación de base de datos temporal
export const users: User[] = [
  { id: 1, nombre: 'Admin', email: 'admin@test.com', password: '1234' }
];