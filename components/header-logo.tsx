import Link from "next/link";
import Image from "next/image";


export const HeaderLogo = () => {
    return (
        <Link href="/" className="flex items-center">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={28}
                height={28}
                className="rounded-full"
            />
            <p className="font-semibold text-white text-2xl ml-2.5">
                Finance
            </p>
        </Link>
    );
}