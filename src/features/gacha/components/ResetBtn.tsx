import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { resetGacha, } from "../../../store/slices/gacha/gachaSlices";

export default function ResetBtn() {
    const dispatch: AppDispatch = useDispatch();

    const handleReset = () => {
        dispatch(resetGacha());
    };

    return (
        <button
            type="button"
            onClick={handleReset}
            aria-label="Reset gacha data"
            className="group mt-5 inline-flex w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-600/80 bg-slate-900/70 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-300 shadow-lg shadow-slate-950/20 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-rose-400/70 hover:bg-rose-950/70 hover:text-rose-100 hover:shadow-rose-950/30 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto sm:min-w-40 sm:px-6"
        >
            <span aria-hidden="true" className="text-lg leading-none text-rose-300 transition-transform duration-300 group-hover:-rotate-45">
                ↻
            </span>
            <span className="text-rose-300">Reset</span>
        </button>
    )


}