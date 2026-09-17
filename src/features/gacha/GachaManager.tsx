import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { setItems } from "../../store/slices/gacha/gachaSlices";
import Log from "./components/Log"
import ResetBtn from "./components/ResetBtn";

// หน้า Gacha
export default function GachaManagerPage() {

    const dispatch: AppDispatch = useDispatch(); // สร้างตัวส่ง Action เพื่อไปสั่งเปลี่ยนแปลงข้อมูลใน Redux Store (เช่น สั่ง rollGacha(), addItem())
    const inventory = useSelector((state: RootState) => state.gacha.inventory); // ดึงข้อมูลเฉพาะส่วนที่ต้องการ (ในที่นี้คือ inventory) จาก Redux Store มาใช้งานใน Component
    // "โชว์ใน textarea" รวมข้อความจาก Array inventory ให้กลายเป็น Text ยาวๆ แยกด้วยบรรทัดใหม่ (\n)
    const bulkText = inventory.map((item) => item.name).join('\n');

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // แบ่งข้อความทุกครั้งที่ขึ้นบรรทัดใหม่ 
        const lines = e.target.value.split('\n');

        const updatedInventory = lines.map((line, index) => ({
            // เช็กว่า inventory ไม่ได้เป็น null ก่อนเข้า id
            id: inventory[index]?.id || Date.now.toString() + index,
            name: line
        }));

        // ส่ง Array ชุดใหม่ไปแทนที่ State เดิมใน Redux
        dispatch(setItems(updatedInventory));
    }

    return (
        <aside className=" fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex max-h-[45vh] w-[92%] max-w-lg flex-col rounded-2xl border border-slate-800 bg-slate-900/95 p-4 text-slate-100 shadow-2xl backdrop-blur-md transition-all duration-300 ease-in-out sm:top-0 sm:right-0 sm:left-auto sm:translate-x-0 sm:h-full sm:w-80 sm:max-w-none sm:max-h-none sm:rounded-none sm:border-l sm:bg-slate-900 sm:p-6">
            <div className=" w-full  gap-4 overflow-y-auto pr-1">
                <textarea rows={4} name="message"
                    onChange={handleOnChange}
                    value={bulkText}
                    className="w-full px-4 py-3 text-sm sm:text-base text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg outline-none resize-none transition-all duration-200   focus:ring-blue-500/15">
                </textarea>
            </div>
            <div className="shrink-0 mb-3">
                <ResetBtn />
            </div>
            <div className="h-32 shrink-0 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs">
                <Log />
            </div>
        </aside >
    )
}