
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { logItem, rollGacha } from "../../../store/slices/gacha/gachaSlices";
import gachaBodyImg from "../assets/gacha-body.png";
import gachaHandleImg from "../assets/gacha-handle.png";

interface GachaMachineProps {
    totalItems: number;
}

export default function GachaMachine({ totalItems }: GachaMachineProps) {
    const dispatch: AppDispatch = useDispatch();
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    // Hooks จะต้องถูกเรียกใช้ที่ระดับบนสุด (Top-level) ของ Functional Component เท่านั้น
    useEffect(() => {
        if (!isEmpty) return;
        const timer = setTimeout(() => {
            setIsEmpty(false);
        }, 4000);
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsEmpty(false);
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isEmpty]);

    const handleClick = () => {
        if (totalItems === 0) {
            setIsEmpty(true);
            return;
        }
        setIsSpinning(true);
        setRotation((prev) => prev + 360)
        setTimeout(() => {
            dispatch(rollGacha());
            dispatch(logItem());
            //
            setIsSpinning(false);
        }, 1000);
    }

    return (<div className="relative w-154 h-170 flex justify-center items-center  rounded-xl p-4" >
        <img src={gachaBodyImg} alt="Gacha body" className="select-none absolute inset-0 w-full h-full object-contain pointer-events-none" />

        <AnimatePresence>
            {isEmpty && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsEmpty(false)}
                    role="presentation"
                >
                    <motion.div
                        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-amber-300/20 bg-slate-900 p-7 text-center text-white shadow-2xl"
                        initial={{ opacity: 0, scale: 0.88, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 12 }}
                        transition={{ type: "spring", stiffness: 320, damping: 24 }}
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="empty-gacha-title"
                    >
                        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/15 text-3xl font-bold text-amber-300 shadow-[0_0_32px_rgba(251,191,36,0.18)]">
                            !
                        </div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                            เครื่องกาชาว่างเปล่า
                        </p>
                        <h2 id="empty-gacha-title" className="mb-3 text-2xl font-bold text-white">
                            ยังไม่มีรายชื่อให้สุ่ม
                        </h2>
                        <p className="mx-auto max-w-xs text-sm leading-6 text-slate-300">
                            เพิ่มรายชื่อหรือไอเทมก่อน แล้วกลับมากดที่มือหมุนเพื่อเริ่มสุ่ม
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsEmpty(false)}
                            className="mt-6 w-full cursor-pointer rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 active:scale-[0.98]"
                        >
                            เข้าใจแล้ว
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        <motion.img src={gachaHandleImg} alt="Gacha handle" className="select-none absolute w-30 h-30 cursor-pointer z-10 top-[64%] left-[40%]"
            animate={{ rotate: rotation }}
            onClick={handleClick}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{ scale: isSpinning ? 1 : 0.95 }}
            style={{ pointerEvents: isSpinning ? "none" : "auto", }}
        >
        </motion.img>
    </div >
    )
}