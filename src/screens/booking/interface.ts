export interface Booking {
    id: string;
    roomId: string;
    customerId: string;
    checkInDate: string;
    checkOutDate: string;
    specialRequests?: string;
    status: 'Booked' | 'Checked In' | 'Checked Out';
  }
  
  export interface Room {
    id: string;
    roomType: string;
    pricePerNight: number;
    availability: boolean;
  }
  
  export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  }
  
  export interface Payment {
    id: string;
    bookingId: string;
    amount: number;
    paymentDate: string;
    paymentMethod: 'Credit Card' | 'Cash' | 'Other';
  }
  