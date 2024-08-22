export interface Payment {
    id: string;
    bookingId: string;
    amount: number;
    paymentDate: string;
    paymentMethod: 'Credit Card' | 'Cash' | 'Other';
    status: 'Pending' | 'Completed';
  }
  
  export interface Booking {
    id: string;
    roomId: string;
    customerId: string;
    checkInDate: string;
    checkOutDate: string;
    specialRequests?: string;
    status: 'Booked' | 'Checked In' | 'Checked Out';
  }
  