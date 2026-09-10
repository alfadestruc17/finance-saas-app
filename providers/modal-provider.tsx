"use client"

import { useEffect, useState } from "react"

import { NewAccountDialog } from "@/features/accounts/components/new-account-dialog"
import { EditAccountDialog } from "@/features/accounts/components/edit-account-dialog"

import { NewCategoryDialog } from "@/features/categories/components/new-category-dialog"
import { EditCategoryDialog } from "@/features/categories/components/edit-category-dialog"

import { NewTransactionDialog } from "@/features/transactions/components/new-transaction-dialog"
import { EditTransactionDialog } from "@/features/transactions/components/edit-transaction-dialog"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <NewAccountDialog />
            <EditAccountDialog />

            <NewCategoryDialog />
            <EditCategoryDialog />

            <NewTransactionDialog />
            <EditTransactionDialog />
        </>
    )
}
