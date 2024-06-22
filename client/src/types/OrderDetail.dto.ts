interface OrderDetailDto{
    id: number;
    order: {
        id: number;
        customerName: string;
        paymentId: string;
        createdAt: string;
        address: string;
        phone: string;
    };
    product: {
        id: string;
        name: string;
        stock: number;
        price: number;
        picture1: string;
        description: string;
        size: string;
    };
    quantity: number;
    isConfirm: boolean;
    status: string;
}
