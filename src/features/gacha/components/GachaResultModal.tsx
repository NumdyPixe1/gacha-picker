import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

interface GachaResultModalProps {
    item: any
    isOpen: boolean;
    onClose: () => void;
}

export default function GachaResultModal({ item, isOpen, onClose }: GachaResultModalProps) {
    // Effect
    const confettiParticles = useMemo(() => {
        const colors = ["#FBBF24", "#F43F5E", "#3B82F6", "#10B981", "#A855F7", "#EC4899"];
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100 - 50, // กระจายจากซ้ายไปขวา (-50vw ถึง 50vw)
            yStart: -(Math.random() * 100 + 50), // เริ่มร่วงจากเหนือน้ำตก screen
            yEnd: Math.random() * 200 + 400, // ความลึกที่ร่วงลงไป
            rotate: Math.random() * 720 - 360, // หมุนรอบตัว
            scale: Math.random() * 0.6 + 0.6, // สุ่มขนาดเล็ก-ใหญ่
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: Math.random() * 0.3, // สุ่มเวลาเริ่มร่วงให้ทยอยลงมา
            duration: Math.random() * 1.5 + 2, // สุ่มความเร็วในการร่วง (2 - 3.5 วิ)
        }));
    }, [isOpen]); // สุ่มใหม่ทุกครั้งที่เปิด Modal

    if (!item) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                // Backdrop พื้นหลังสีดำจางๆ
                <motion.div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 select-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <div className="absolute inset-0 pointer-events-none flex justify-center">
                        {confettiParticles.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute w-3 h-4 rounded-sm shadow-sm"
                                style={{ backgroundColor: p.color }}
                                initial={{
                                    x: `${p.x}vw`,
                                    y: p.yStart,
                                    rotate: 0,
                                    opacity: 1,
                                    scale: p.scale,
                                }}
                                animate={{
                                    y: p.yEnd,
                                    rotate: p.rotate,
                                    opacity: [1, 1, 0], // จางหายไปตอนใกล้ถึงปลายทาง
                                }}
                                transition={{
                                    duration: p.duration,
                                    delay: p.delay,
                                    ease: "easeOut",
                                    repeat: Infinity, // ให้ร่วงวนลูปเรื่อยๆ หรือลบออกถ้าอยากให้ร่วงรอบเดียว
                                }}
                            />
                        ))}
                    </div>



                    {/* Card แสดงผลไอเทมที่สุ่มได้ */}
                    <motion.div
                        className="bg-slate-900 border-2 border-blue-400 p-6 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4"
                        initial={{ scale: 0.5, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onClick={(e) => e.stopPropagation()} // ป้องกันไม่ให้คลิกที่ตัวการ์ดแล้วปิด Modal
                    >
                        <span className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">
                            คุณสุ่มได้
                        </span>
                        <h2 className="text-2xl font-bold text-white mb-4">{item.name}</h2>

                        <button
                            onClick={onClose}
                            className="cursor-pointer mt-6 w-full py-2 bg-green-600 transition-colors hover:bg-green-500 text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
                        >
                            ตกลง
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}