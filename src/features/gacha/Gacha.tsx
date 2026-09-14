import { useSelector } from "react-redux";
import GachaMachine from "./components/GachaMachine";
import type { RootState } from "../../store/store";
import GachaResultModal from "./components/GachaResultModal";
import { useEffect, useState } from "react";


// หน้า Gacha
export default function GachaPage() {
    const obtainedItems = useSelector((state: RootState) => state.gacha.obtainedItems);
    const inventory = useSelector((state: RootState) => state.gacha.inventory); // ดึงข้อมูลเฉพาะส่วนที่ต้องการ (ในที่นี้คือ inventory) จาก Redux Store มาใช้งานใน Component
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (obtainedItems) {
            setIsModalOpen(true);
        }
    }, [obtainedItems]);

    const handleCloseModal = () => {

        setIsModalOpen(false);
    }

    return (<>
        <GachaMachine totalItems={inventory.length} />
        {obtainedItems && (<GachaResultModal
            item={obtainedItems}
            isOpen={isModalOpen}
            onClose={handleCloseModal} />)
        }
        {/* {obtainedItems && (<div className="p-4 bg-yellow-100 border border-yellow-400 rounded-md">
            🎉 คุณได้รับ: <strong>{obtainedItems.name}</strong>
        </div >)
            // : <div className="p-4 bg-gray-100 border border-gray-300 text-gray-500 rounded-md text-center">
            //     ยังไม่มีไอเทม กดปุ่มสุ่มกาชาด้านบนเพื่อเริ่มสุ่ม!
            // </div>
        } */}
    </>)
}