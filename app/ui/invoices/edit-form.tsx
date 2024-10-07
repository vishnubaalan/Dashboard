'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={invoice.id} />

      {/* Customer Name */}
      <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
          Choose customer
        </label>
        <div className="relative">
          <select
            id="customer"
            name="customerId"
            aria-label="Select customer"
            className={`peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
              state.errors?.customerId ? 'border-red-500' : ''
            }`}
            defaultValue={invoice.customer_id ?? ''} // Ensure defaultValue is properly set
            aria-invalid={state.errors?.customerId ? 'true' : 'false'}
            aria-describedby={state.errors?.customerId ? 'customer-error' : undefined}
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        {state.errors?.customerId && (
          <p id="customer-error" className="mt-2 text-sm text-red-600">
            {state.errors.customerId}
          </p>
        )}
      </div>

      {/* Invoice Amount */}
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Choose an amount
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              defaultValue={invoice.amount ?? ''} // Ensure defaultValue is properly set
              placeholder="Enter USD amount"
              aria-label="Invoice amount"
              className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
                state.errors?.amount ? 'border-red-500' : ''
              }`}
              aria-invalid={state.errors?.amount ? 'true' : 'false'}
              aria-describedby={state.errors?.amount ? 'amount-error' : undefined}
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        {state.errors?.amount && (
          <p id="amount-error" className="mt-2 text-sm text-red-600">
            {state.errors.amount}
          </p>
        )}
      </div>

      {/* Invoice Status */}
      <fieldset>
        <legend className="mb-2 block text-sm font-medium">
          Set the invoice status
        </legend>
        <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                id="pending"
                name="status"
                type="radio"
                value="pending"
                defaultChecked={invoice.status === 'pending'}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                aria-label="Set invoice status to pending"
              />
              <label
                htmlFor="pending"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
              >
                Pending <ClockIcon className="h-4 w-4" />
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="paid"
                name="status"
                type="radio"
                value="paid"
                defaultChecked={invoice.status === 'paid'}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                aria-label="Set invoice status to paid"
              />
              <label
                htmlFor="paid"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
              >
                Paid <CheckIcon className="h-4 w-4" />
              </label>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Submit and Cancel */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
