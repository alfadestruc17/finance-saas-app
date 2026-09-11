"use client"

import { InferResponseType } from "hono"
import { useTranslations } from "next-intl"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { client } from "@/lib/hono"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Actions } from "./actions"

export type ResponseType = InferResponseType<typeof client.api.accounts.$get, 200>["data"][0];

const NameHeader = ({ onSort }: { onSort: () => void }) => {
  const t = useTranslations("accounts");

  return (
    <Button variant="ghost" onClick={onSort}>
      {t("name")}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
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

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => <SelectAllHeader table={table} />,
    cell: ({ row }) => <SelectRowCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <NameHeader onSort={() => column.toggleSorting(column.getIsSorted() === "asc")} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />
  }
]
