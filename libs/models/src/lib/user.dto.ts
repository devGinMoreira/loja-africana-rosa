/**
 * UserDTO - User Data Transfer Object
 *
 * Represents customer and admin user information.
 */

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin' | 'super_admin';
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface UpdateUserDTO {
  name?: string;
  phone?: string;
  avatar_url?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  access_token: string;
  user: UserDTO;
}
