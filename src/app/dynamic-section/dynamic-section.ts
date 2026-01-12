import { DecimalPipe } from '@angular/common'; // ✅ 1. นำเข้า DecimalPipe
import { Component } from '@angular/core';

// Interface กำหนดหน้าตาข้อมูล
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
  imports: [DecimalPipe], // ✅ 2. ใส่ใน imports
  templateUrl: './dynamic-section.html',
  styleUrl: './dynamic-section.scss',
})
export class DynamicSection {
  // ✅ 3. ตัวแปรและฟังก์ชันต้องอยู่ข้างในวงเล็บปีกกานี้ทั้งหมด

  sections: Section[] = []; // เก็บรายการ Section
  nextSectionId = 1;
  nextInputId = 1;

  constructor() {
    this.addSection(); // สร้าง Section แรกทันทีที่เปิด
  }

  // --- Functions สำหรับ Section ---
  addSection() {
    this.sections.push({
      id: this.nextSectionId++,
      inputs: [
        { id: this.nextInputId++, value: 0 }, // แถม Input 1 อัน
      ],
    });
  }

  removeSection(id: number) {
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
} // ✅ 4. ปิดท้าย Class ตรงนี้
