import { Component } from '@angular/core';

// 1. สร้าง Interface เพื่อกำหนดหน้าตาข้อมูล
interface InputItem {
  id: number;
  value: number;
}

interface Section {
  id: number;
  inputs: InputItem[];
}

@Component({
  selector: 'app-dynamic-section',
  standalone: true,
  imports: [], // ไม่ต้องใช้อะไรเพิ่ม เพราะเราใช้ Standard HTML Binding
  templateUrl: './dynamic-section.html',
  styleUrl: './dynamic-section.scss', // หรือ .css แล้วแต่ตอนสร้าง
})
export class DynamicSection {
  // Array เก็บรายการ Section ทั้งหมด
  sections: Section[] = [];

  // ตัวนับสำหรับสร้าง ID ไม่ซ้ำกัน (สำคัญมากสำหรับ track)
  nextSectionId = 1;
  nextInputId = 1;

  constructor() {
    this.addSection();
  }

  // --- Functions สำหรับ Section ---
  addSection() {
    // 2. สร้าง Section พร้อมแถม Input: เปรียบเสมือนบรรทัด 130 (สั่งสร้าง Input ทันที)
    this.sections.push({
      id: this.nextSectionId++,
      inputs: [
        { id: this.nextInputId++, value: 0 }, // ✅ ใส่ Input เริ่มต้นให้เลย 1 อัน
      ],
    });
  }

  removeSection(id: number) {
    // ลบ Section ที่มี id ตรงกันออก
    this.sections = this.sections.filter((sec) => sec.id !== id);
  }

  // --- Functions สำหรับ Input ข้างใน Section ---
  addInput(section: Section) {
    section.inputs.push({
      id: this.nextInputId++,
      value: 0,
    });
  }

  removeInput(section: Section, inputId: number) {
    section.inputs = section.inputs.filter((inp) => inp.id !== inputId);
  }

  // ฟังก์ชันอัปเดตค่าเมื่อพิมพ์ตัวเลข
  updateValue(item: InputItem, newValue: number) {
    item.value = newValue;
  }

  // ฟังก์ชันคำนวณผลรวม
  calculateSum(section: Section): number {
    return section.inputs.reduce((sum, item) => sum + item.value, 0);
  }
}
