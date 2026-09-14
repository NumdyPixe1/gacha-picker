import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { setItems } from "../../store/slices/gacha/gachaSlices";
import Log from "./components/Log"

// หน้า Gacha
export default function GachaManagerPage() {

    const dispatch: AppDispatch = useDispatch(); // สร้างตัวส่ง Action เพื่อไปสั่งเปลี่ยนแปลงข้อมูลใน Redux Store (เช่น สั่ง rollGacha(), addItem())
    const inventory = useSelector((state: RootState) => state.gacha.inventory); // ดึงข้อมูลเฉพาะส่วนที่ต้องการ (ในที่นี้คือ inventory) จาก Redux Store มาใช้งานใน Component
    // "โชว์ใน textarea" รวมข้อความจาก Array inventory ให้กลายเป็น Text ยาวๆ แยกด้วยบรรทัดใหม่ (\n)
    const bulkText = inventory.map((item) => item.name).join('\n');

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const line = e.target.value.split('\n');
        const updatedInventory = line.map((line, index) => ({
            // เช็กว่า inventory ไม่ได้เป็น null ก่อนเข้า id
            id: inventory[index]?.id || Date.now.toString() + index,
            name: line
        }));
        // ส่ง Array ชุดใหม่ไปแทนที่ State เดิมใน Redux
        dispatch(setItems(updatedInventory));
    }

    return (
        <aside className=" fixed top-0 right-0 z-50 flex h-full w-80 flex-col border-l border-slate-800 bg-slate-900 p-6 text-slate-100 shadow-2xl transition-transform duration-300 ease-in-out">

            <div className="w-full flex flex-col gap-4 overflow-y-auto pr-1">

                <textarea rows={10} name="message"
                    onChange={handleOnChange}
                    value={bulkText}
                    className=" w-full px-4 py-3 text-base text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg outline-none resize-y transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15">
                </textarea>
            </div>
            <Log />
        </aside >
    )
}