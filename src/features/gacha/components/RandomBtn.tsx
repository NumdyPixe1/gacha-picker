/*import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { logItem, rollGacha, } from "../../../store/slices/gacha/gachaSlices";

export default function RandomBtn() {
    const dispatch: AppDispatch = useDispatch();

    const handleRandom = () => {
        dispatch(rollGacha());
        dispatch(logItem());
    };

    return (
        <button
            type="button"
            onClick={handleRandom}
            className="group relative inline-flex min-w-40 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-8 py-3 text-base font-bold tracking-wide text-white shadow-lg shadow-orange-500/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/35 active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/60"
        >
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">Random</span>
        </button>
    )


}*/