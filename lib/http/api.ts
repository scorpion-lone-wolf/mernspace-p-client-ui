import type { Customer } from "@/lib/types";
import axios from "axios";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
const ORDER_SERVICE_PREFIX = "/api/order";
export type CouponValidationResult = {
  valid: boolean;
  discount: number;
};
export const getCustmer = () => api.get<{ data: Customer }>(`${ORDER_SERVICE_PREFIX}/customer`);
export const addAddress = (customerId: string, address: string) =>
  api.patch(`${ORDER_SERVICE_PREFIX}/customer/addresses/${customerId}`, {
    address,
  });
export const verifyCoupon = (code: string, tenant: string) =>
  api.post<{ data: CouponValidationResult }>(`${ORDER_SERVICE_PREFIX}/coupons/validate`, { code, tenant });
