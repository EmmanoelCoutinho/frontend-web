import { api } from "../axios";
import { TypeFormData } from '@/schemas/defaultLoginSchema';

interface LoginResponse {
  access_token: string;
  // Adicione outros campos conforme necessário
}

export async function LoginAuth (loginData: TypeFormData ) {
  const response  = api.post<LoginResponse>('/auth/login', loginData);
  return response;
} 