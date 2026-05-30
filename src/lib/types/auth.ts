export interface LoginRequest {
  userId: string;   // CPF ou CNPJ (com ou sem máscara)
  password: string;
}

export interface LoginResponse {
  token: string;
}
