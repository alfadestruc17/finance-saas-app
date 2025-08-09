import {

    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";



export const NewAccountSheet = () => {
    return (
        <Sheet open>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Nueva Cuenta
                    </SheetTitle>
                    <SheetDescription>
                        Crea una nueva cuenta para gestionar tus finanzas.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}