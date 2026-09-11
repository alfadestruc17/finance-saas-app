"use client"

import { InferResponseType } from "hono"
import { format } from "date-fns"
import { useLocale, useTranslations } from "next-intl"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { client } from "@/lib/hono"
import { cn, convertAmountFromMiliunits, formatCurrency } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
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
  const t = useTranslations("transactions")

  return (
    <span
      onClick={() => (categoryId ? onOpen(categoryId) : undefined)}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500",
      )}
    >
      {category || t("noCategory")}
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

const SortableHeader = ({
  label,
  onSort,
}: {
  label: string
  onSort: () => void
}) => (
  <Button variant="ghost" onClick={onSort}>
    {label}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
)

const AmountCell = ({ amount }: { amount: number }) => {
  const locale = useLocale() as Locale
  const formatted = formatCurrency(convertAmountFromMiliunits(amount), locale)

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
}

const SelectAllHeader = ({
  table,
}: {
  table: { getIsAllPageRowsSelected: () => boolean; getIsSomePageRowsSelected: () => boolean; toggleAllPageRowsSelected: (value: boolean) => void };
}) => {
  const t = useTranslations("common");

  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label={t("selectAll")}
    />
  )
}

const SelectRowCell = ({
  row,
}: {
  row: { getIsSelected: () => boolean; toggleSelected: (value: boolean) => void };
}) => {
  const t = useTranslations("common");

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label={t("selectRow")}
    />
  )
}

const DateCell = ({ date }: { date: string }) => {
  const locale = useLocale() as Locale
  return <span>{format(new Date(date), locale === "en" ? "MMM dd, yyyy" : "dd MMM, yyyy")}</span>
}

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => <SelectAllHeader table={table} />,
    cell: ({ row }) => <SelectRowCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: function DateHeader({ column }) {
      const t = useTranslations("transactions.columns")
      return (
        <SortableHeader
          label={t("date")}
          onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      )
    },
    cell: ({ row }) => <DateCell date={row.getValue("date")} />,
  },
  {
    accessorKey: "category",
    header: function CategoryHeader({ column }) {
      const t = useTranslations("transactions.columns")
      return (
        <SortableHeader
          label={t("category")}
          onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      )
    },
    cell: ({ row }) => (
      <CategoryColumn
        category={row.original.category}
        categoryId={row.original.categoryId}
      />
    ),
  },
  {
    accessorKey: "payee",
    header: function PayeeHeader({ column }) {
      const t = useTranslations("transactions.columns")
      return (
        <SortableHeader
          label={t("payee")}
          onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      )
    },
  },
  {
    accessorKey: "amount",
    header: function AmountHeader({ column }) {
      const t = useTranslations("transactions.columns")
      return (
        <SortableHeader
          label={t("amount")}
          onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      )
    },
    cell: ({ row }) => <AmountCell amount={parseFloat(row.getValue("amount"))} />,
  },
  {
    accessorKey: "account",
    header: function AccountHeader({ column }) {
      const t = useTranslations("transactions.columns")
      return (
        <SortableHeader
          label={t("account")}
          onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      )
    },
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
