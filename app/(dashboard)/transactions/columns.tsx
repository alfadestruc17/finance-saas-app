"use client"

import { InferResponseType } from "hono"
import { format } from "date-fns"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { client } from "@/lib/hono"
import { cn, convertAmountFromMiliunits, formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { useOpenCategory } from "@/features/categories/hooks/use-open-category"
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account"

import { Actions } from "./actions"

export type ResponseType = InferResponseType<
  typeof client.api.transactions.$get,
  200
>["data"][0]

const CategoryColumn = ({
  category,
  categoryId,
}: {
  category: string | null
  categoryId: string | null
}) => {
  const { onOpen } = useOpenCategory()

  return (
    <span
      onClick={() => (categoryId ? onOpen(categoryId) : undefined)}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500",
      )}
    >
      {category || "Sin categoría"}
    </span>
  )
}

const AccountColumn = ({
  account,
  accountId,
}: {
  account: string
  accountId: string
}) => {
  const { onOpen } = useOpenAccount()

  return (
    <span
      onClick={() => onOpen(accountId)}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account}
    </span>
  )
}

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("date") as string
      return <span>{format(new Date(date), "dd MMM, yyyy")}</span>
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Categoría
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CategoryColumn
        category={row.original.category}
        categoryId={row.original.categoryId}
      />
    ),
  },
  {
    accessorKey: "payee",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Beneficiario
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Monto
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = formatCurrency(convertAmountFromMiliunits(amount))

      return (
        <Badge
          variant={amount < 0 ? "destructive" : "default"}
          className={cn(
            "text-xs font-medium px-3.5 py-2.5",
            amount >= 0 && "bg-emerald-500 hover:bg-emerald-600",
          )}
        >
          {formatted}
        </Badge>
      )
    },
  },
  {
    accessorKey: "account",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cuenta
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <AccountColumn
        account={row.original.account}
        accountId={row.original.accountId}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
]
