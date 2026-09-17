import { useSelector } from "react-redux";
import GachaMachine from "./components/GachaMachine";
import type { RootState } from "../../store/store";
import GachaResultModal from "./components/GachaResultModal";
import { useEffect, useState } from "react";


// หน้า Gacha
export default function GachaPage() {
    const obtainedItems = useSelector((state: RootState) => state.gacha.obtainedItems);
    const inventory = useSelector((state: RootState) => state.gacha.inventory); // ดึงข้อมูลเฉพาะส่วนที่ต้องการ (ในที่นี้คือ inventory) จาก Redux Store มาใช้งานใน Component
    const validItemsCount = inventory.filter((item) => item.name.trim() !== '').length;

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
        <GachaMachine totalItems={validItemsCount} />
        {obtainedItems && (<GachaResultModal
            item={obtainedItems}
            isOpen={isModalOpen}
            onClose={handleCloseModal} />)
        }

    </>)
}