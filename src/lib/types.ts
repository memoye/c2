export interface IUser {
  sub: string;
  auth_time: number;
  idp: string;
  role: "admin" | string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  id: string;
  phone_number: string;
  TenantId: string;
  Tenant: string;
  Permissions: string[];
  FirmId: string;
  Firm: string;
  amr: string;
}
