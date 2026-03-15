'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  image: string;
  variant?: string;
  quantity: number;
  price: string;
}

interface OrderDetail {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending';
  createdDate: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  products: Product[];
  subtotal: string;
  shipping: string;
  total: string;
}

const mockOrderDetails: Record<string, OrderDetail> = {
  ORD12345: {
    id: '#ORD12345',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    orderStatus: 'Processing',
    paymentStatus: 'Paid',
    createdDate: '12 Feb 2026',
    shippingAddress: {
      fullName: 'John Doe',
      phone: '+91 9876543210',
      addressLine: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      pincode: '10001',
      country: 'United States',
    },
    products: [
      {
        id: '1',
        name: 'Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
        variant: 'Black',
        quantity: 1,
        price: 'Rs. 8,500',
      },
      {
        id: '2',
        name: 'USB-C Cable',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=100&h=100&fit=crop',
        variant: 'White, 3M',
        quantity: 2,
        price: 'Rs. 2,000',
      },
    ],
    subtotal: 'Rs. 12,500',
    shipping: 'Free',
    total: 'Rs. 12,500',
  },
  ORD12346: {
    id: '#ORD12346',
    customerName: 'Sarah Smith',
    email: 'sarah@example.com',
    phone: '+91 9876543211',
    orderStatus: 'Shipped',
    paymentStatus: 'Paid',
    createdDate: '11 Feb 2026',
    shippingAddress: {
      fullName: 'Sarah Smith',
      phone: '+91 9876543211',
      addressLine: '456 Oak Avenue, Suite 200',
      city: 'Los Angeles',
      state: 'CA',
      pincode: '90001',
      country: 'United States',
    },
    products: [
      {
        id: '3',
        name: 'Premium Backpack',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
        variant: 'Navy Blue',
        quantity: 1,
        price: 'Rs. 18,000',
      },
      {
        id: '4',
        name: 'Portable Charger',
        image: 'https://images.unsplash.com/photo-1609942545066-82342eb2b562?w=100&h=100&fit=crop',
        variant: 'Silver, 20000mAh',
        quantity: 1,
        price: 'Rs. 7,000',
      },
    ],
    subtotal: 'Rs. 25,000',
    shipping: 'Free',
    total: 'Rs. 25,000',
  },
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Shipped':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Delivered':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Pending':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'Paid':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Cancelled':
      return 'bg-gray-100 text-gray-800 border-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);

  const order = mockOrderDetails[orderId];

  if (!order) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back to Orders
              </Button>
            </Link>
          </div>
          <Card className="p-8 text-center">
            <p className="text-slate-600">Order not found</p>
          </Card>
        </div>
      </main>
    );
  }

  const handleStatusUpdate = () => {
    if (selectedStatus && selectedStatus !== order.orderStatus) {
      setIsUpdating(true);
      // Simulate API call
      setTimeout(() => {
        setIsUpdating(false);
        // In a real app, you'd update the order and show a success message
        alert(`Order status updated to ${selectedStatus}`);
      }, 1000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/admin/orders">
          <Button variant="ghost" size="sm" className="gap-1 mb-6 text-slate-600 hover:text-slate-900">
            <ChevronLeft className="h-4 w-4" />
            Back to Orders
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{order.id}</h1>
          <p className="text-slate-600">
            Created on {order.createdDate} by {order.customerName}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information Card */}
            <Card className="border-slate-200 shadow-sm bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Customer Information</h2>
              <Separator className="mb-4 bg-slate-200" />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Full Name</span>
                  <span className="text-slate-900 font-medium">{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Email</span>
                  <span className="text-slate-900 font-medium">{order.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Phone Number</span>
                  <span className="text-slate-900 font-medium">{order.phone}</span>
                </div>
              </div>
            </Card>

            {/* Shipping Address Card */}
            <Card className="border-slate-200 shadow-sm bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Shipping Address</h2>
              <Separator className="mb-4 bg-slate-200" />
              <div className="space-y-3 text-slate-700">
                <p className="font-medium text-slate-900">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.phone}</p>
                <p>{order.shippingAddress.addressLine}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.pincode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <Card className="border-slate-200 shadow-sm bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>
              <Separator className="mb-4 bg-slate-200" />

              {/* Products List */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {order.products.map((product) => (
                  <div key={product.id} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0">
                    <div className="relative h-16 w-16 flex-shrink-0 bg-slate-100 rounded">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-slate-900">{product.name}</p>
                      {product.variant && (
                        <p className="text-slate-600 text-xs">{product.variant}</p>
                      )}
                      <p className="text-slate-600 text-xs mt-1">
                        Qty: {product.quantity} × {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="mb-4 bg-slate-200" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>{order.shipping}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="font-semibold text-lg text-blue-600">{order.total}</span>
                </div>
              </div>
            </Card>

            {/* Order Status Management Card */}
            <Card className="border-slate-200 shadow-sm bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Status</h2>
              <Separator className="mb-4 bg-slate-200" />

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Current Status</p>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(order.orderStatus)} font-medium`}
                  >
                    {order.orderStatus}
                  </Badge>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">
                    Update Status
                  </label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="border-slate-200 text-slate-900">
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleStatusUpdate}
                  disabled={!selectedStatus || selectedStatus === order.orderStatus || isUpdating}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isUpdating ? 'Updating...' : 'Update Status'}
                </Button>
              </div>
            </Card>

            {/* Payment Status Card */}
            <Card className="border-slate-200 shadow-sm bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Payment Status</h2>
              <Separator className="mb-4 bg-slate-200" />

              <Badge
                variant="outline"
                className={`${getStatusColor(order.paymentStatus)} font-medium`}
              >
                {order.paymentStatus}
              </Badge>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
