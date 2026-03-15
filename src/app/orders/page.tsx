'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  totalAmount: string;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending';
  createdDate: string;
}

const mockOrders: Order[] = [
  {
    id: '#ORD12345',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    totalAmount: 'Rs. 12,500',
    orderStatus: 'Processing',
    paymentStatus: 'Paid',
    createdDate: '12 Feb 2026',
  },
  {
    id: '#ORD12346',
    customerName: 'Sarah Smith',
    email: 'sarah@example.com',
    phone: '+91 9876543211',
    totalAmount: 'Rs. 25,000',
    orderStatus: 'Shipped',
    paymentStatus: 'Paid',
    createdDate: '11 Feb 2026',
  },
  {
    id: '#ORD12347',
    customerName: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+91 9876543212',
    totalAmount: 'Rs. 8,750',
    orderStatus: 'Delivered',
    paymentStatus: 'Paid',
    createdDate: '10 Feb 2026',
  },
  {
    id: '#ORD12348',
    customerName: 'Emma Williams',
    email: 'emma@example.com',
    phone: '+91 9876543213',
    totalAmount: 'Rs. 15,200',
    orderStatus: 'Pending',
    paymentStatus: 'Pending',
    createdDate: '09 Feb 2026',
  },
  {
    id: '#ORD12349',
    customerName: 'David Brown',
    email: 'david@example.com',
    phone: '+91 9876543214',
    totalAmount: 'Rs. 32,100',
    orderStatus: 'Processing',
    paymentStatus: 'Paid',
    createdDate: '08 Feb 2026',
  },
  {
    id: '#ORD12350',
    customerName: 'Lisa Anderson',
    email: 'lisa@example.com',
    phone: '+91 9876543215',
    totalAmount: 'Rs. 9,999',
    orderStatus: 'Cancelled',
    paymentStatus: 'Pending',
    createdDate: '07 Feb 2026',
  },
];

const getStatusBadgeVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'Processing':
      return 'secondary';
    case 'Shipped':
      return 'default';
    case 'Delivered':
      return 'default';
    case 'Pending':
      return 'outline';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'default';
  }
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

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Orders</h1>
          <p className="text-slate-600">Manage and track all customer orders</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by Order ID, Customer name, or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Orders Table Card */}
        <Card className="border-slate-200 shadow-sm bg-white">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="text-slate-700 font-semibold">Order ID</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Customer Name</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Email</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Phone</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Total Amount</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Order Status</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Payment Status</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Created Date</TableHead>
                  <TableHead className="text-right text-slate-700 font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-slate-100 hover:bg-slate-50 transition-colors">
                    <TableCell className="font-semibold text-slate-900">{order.id}</TableCell>
                    <TableCell className="text-slate-800">{order.customerName}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{order.email}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{order.phone}</TableCell>
                    <TableCell className="font-semibold text-slate-900">{order.totalAmount}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(order.orderStatus)} font-medium`}
                      >
                        {order.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(order.paymentStatus)} font-medium`}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{order.createdDate}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/orders/${order.id.replace('#', '')}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1"
                        >
                          View
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-2">No orders found</p>
            <p className="text-slate-400 text-sm">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </main>
  );
}
