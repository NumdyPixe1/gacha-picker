import type { ReactNode } from "react";
import bgImage from "../../assets/bg.png"

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (<>
        <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed text-slate-100 selection:bg-indigo-500 selection:text-white"
            style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="min-h-screen bg-slate-950/70  text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
                <main className=" flex flex-1 flex-col items-center justify-start sm:justify-center px-4 pt-6 pb-36 overflow-y-auto">

                    {children}
                </main>

                <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-6 px-4">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <div className="text-xs text-slate-500 text-center md:text-right">
                            © 2026 Numdao. Built with React & Redux Toolkit.
                        </div>

                    </div>
                </footer>
            </div></div>
    </>)
}