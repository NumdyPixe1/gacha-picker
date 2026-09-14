import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";

interface GachaItem {
    id: string;
    name: string;
}

interface GachaLog {
    id: string;
    items: GachaItem[];
}

// 1. กำหนด Type ของ State
interface GachaState {
    inventory: GachaItem[];
    // ที่สุ่มได้ล่าสุด
    obtainedItems: GachaItem | null;
    // ประวัติการสุ่มทั้งหมด
    log: GachaLog[];
}

// 2. กำหนด ค่าเริ่มต้น (Initial State)
const initialState: GachaState = {
    inventory: [
    ],
    obtainedItems: null,
    log: []
}

// 3. สร้าง Slice (รวม Reducer + Actions ไว้ในที่เดียว)
const gachaSlice = createSlice({
    name: SLICE_BASE_NAME,
    initialState,
    reducers: {
        // รับ Array ใหม่ไปเขียนทับ state.inventory:
        setItems: (state, action: PayloadAction<GachaItem[]>) => {
            state.inventory = action.payload;
        },
        // ------------------------------------------------------
        /*
         บันทึก Log รอบล่าสุดโดยใช้ข้อมูลจาก state.obtainedItems โดยตรง
         (ไม่ต้องรับ PayloadAction เนื่องจากดึง Data จาก Redux State ภายใน ไม่ได้มาจาก UI)
         */
        logItem: (state) => {
            if (!state.obtainedItems) return;
            const newLog: GachaLog = {
                id: Date.now().toString(),
                items: [state.obtainedItems],
            };
            state.log.push(newLog);
            console.log(newLog);
        },
        // ------------------------------------------------------
        // รับ index ที่สุ่มได้มาจาก payload
        // ไม่ต้องมี action.payload เพราะว่า Logic การสุ่มสุ่มจบภายใน Redux State เอง โดยไม่ต้องรับค่าอะไรส่งมาจากฝั่ง UI 
        rollGacha: (state) => {
            if (state.inventory.length === 0) {
                // reset ค่าไอเทมล่าสุด
                state.obtainedItems = null;
                return
            };

            const randomItem = Math.floor(Math.random() * state.inventory.length);
            state.obtainedItems = state.inventory[randomItem];
            // ตัดไอเทมที่สุ่มได้ออกไป
            state.inventory.splice(randomItem, 1);
        }
    }
});
// ------------------------------------------------------

/*   addItem: (state, action: PayloadAction<Omit<GachaItem, 'id'>>) => {
       const newItem: GachaItem = {
           id: Date.now().toString(), // Reducer เป็นคนเจน id ให้เอง
           ...action.payload, // ดึงเฉพาะ message มาแปะ
       };
       state.inventory.push(newItem); // เพิ่มไอเทมชิ้นใหม่ (newItem) "ต่อท้าย"เข้าไปใน Array ตู้กาชา (inventory)
   },*/
// ------------------------------------------------------
/* updateItem: (state, action: PayloadAction<{ id: string, message: string }>) => {
     const index = state.inventory.findIndex((item => item.id === action.payload.id))
     // ไม่พบข้อมูล: จะคืนค่าเป็น -1 เสมอ
     if (index !== -1) {
         state.inventory[index].message = action.payload.message;
     }
 },*/

// ------------------------------------------------------
// Ex. action.payload = { id: "123" }
/* deleteItem: (state, action: PayloadAction<{ id: string }>) => {
     state.inventory = state.inventory.filter((item) => item.id !== action.payload.id)
 },*/


// เรียกใช้ setRandomItem เท่านั้น
export const { rollGacha, setItems, logItem } = gachaSlice.actions;
export default gachaSlice.reducer;