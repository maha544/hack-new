export interface Service {
  serviceName: any;
  status: any;
  id: string;
  name: string;
  description: string;
  price: number;
  staffID: string; 
}

export interface ServiceRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  description: string;
  price: string;
  status: string;
}
