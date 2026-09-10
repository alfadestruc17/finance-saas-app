import { Header } from "@/components/Header";

// El panel siempre requiere sesión de Clerk y lee filtros de la querystring,
// así que se renderiza de forma dinámica (nada de prerender estático).
export const dynamic = "force-dynamic";

type Props = {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <main className="px-3 lg:px-14">{children}</main>
        </>
    );
};

export default DashboardLayout;
