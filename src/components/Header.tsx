import { Pacifico } from "next/font/google";

export default function Header() {
    return (<>
        <header className="flex justify-center items-center p-4 w-full">
                <img src="/logo.png" className="w-auto h-[92px] object-scale-down" />
        </header>
    </>)
}