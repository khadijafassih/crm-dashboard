export type CustomerStatus = "active" | "inactive" | "pending";

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: CustomerStatus;
  avatar: string;
  phoneNumber: string;
  country: string;
  createdAt: string;
}