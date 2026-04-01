"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

const HIDDEN_NAVBAR_PATHS = [/^\/u\/.+/] // hides navbar for /u/[username]

export default function ConditionalNavbar() {
    const pathname = usePathname()
    const hide = HIDDEN_NAVBAR_PATHS.some((pattern) => pattern.test(pathname))
    if (hide) return null
    return <Navbar />
}