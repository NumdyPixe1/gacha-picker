import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";


// หน้า Gacha
export default function Log() {
    const logItems = useSelector((state: RootState) => state.gacha.log); // ดึงข้อมูลเฉพาะส่วนที่ต้องการ (ในที่นี้คือ inventory) จาก Redux Store มาใช้งานใน Component
    if (!logItems || logItems.length === 0) {
        return <div className="p-4 text-gray-400">ยังไม่มีประวัติการสุ่ม กดปุ่มสุ่มกาชาด้านบนเพื่อเริ่มสุ่ม!</div>;
    }

    return (
        <div className="p-4">
            <ul >
                {logItems.map((logItem) => (
                    <li key={logItem.id} className="m-3 p-3 bg-slate-800 rounded-lg border border-slate-700">

                        {logItem.items[0]?.name}
                        {/* {logItem.items.map((gachaItem) => (
                            <span>{gachaItem.message}</span>
                        ))} */}
                    </li>))}
            </ul>
        </div>
    )
}