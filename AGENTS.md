# AGENTS.md

# TSL AI Coding Agent Instructions

## 1. Role

คุณคือ autonomous coding agent สำหรับพัฒนา TSL

หน้าที่คือ:

```text
Inspect
→ Plan
→ Implement
→ Test
→ Verify
→ Review
```

เป้าหมายคือทำงานให้สำเร็จตาม task โดยไม่เพิ่ม scope

---

# 2. Source of Truth

ไฟล์สำคัญ:

```text
SPEC.md
project.md
AGENTS.md
```

ลำดับความสำคัญ:

```text
SPEC.md
    ↓
Current Task
    ↓
Existing Code
```

`SPEC.md` คือ source of truth สำหรับ language behavior

`AGENTS.md` คือ source of truth สำหรับวิธีทำงานของ agent

---

# 3. HARD RULES

## Rule 1 — ห้ามเดา

ถ้าสิ่งใดไม่ถูกกำหนด:

```text
DO NOT GUESS
DO NOT INVENT
DO NOT EXPAND
```

เลือก implementation ที่เล็กที่สุดที่สอดคล้องกับ SPEC

ถ้ายังตัดสินใจไม่ได้ ให้หยุดตรงจุดนั้นและรายงาน ambiguity

---

## Rule 2 — ห้ามเพิ่ม Feature

ห้ามเพิ่ม:

```text
syntax
runtime API
engine API
language feature
dependency
architecture
```

เว้นแต่ task หรือ SPEC ระบุไว้

---

## Rule 3 — ห้ามข้าม Phase

ทำเฉพาะ current task/current phase

เมื่อเสร็จแล้ว:

```text
STOP
```

ห้ามเริ่ม Phase ถัดไปเอง

---

## Rule 4 — ห้ามแก้ไฟล์ที่ไม่เกี่ยวข้อง

ก่อนแก้ต้องระบุว่าไฟล์ใดเกี่ยวข้อง

แก้เฉพาะไฟล์ที่จำเป็น

ถ้าเห็นปัญหาอื่น:

```text
do not fix automatically
```

ยกเว้นปัญหานั้นทำให้ current task ทำงานไม่ได้

---

## Rule 5 — Smallest Correct Change

เลือก:

```text
smallest implementation
smallest diff
least complexity
```

ห้ามเขียน abstraction เผื่ออนาคตโดยไม่มี requirement

---

# 4. BEFORE MODIFYING CODE

ก่อนแก้ไขโค้ดต้อง:

```text
1. Inspect project structure
2. Read relevant files
3. Read SPEC.md
4. Read relevant tests
5. Understand existing implementation
6. Identify constraints
```

ห้ามเริ่มเขียนโค้ดจาก prompt เพียงอย่างเดียวโดยไม่ตรวจ repository

---

# 5. TASK EXECUTION

สำหรับทุก task ให้ทำ:

```text
Understand
    ↓
Inspect
    ↓
Plan
    ↓
Implement
    ↓
Test
    ↓
Verify
    ↓
Review Diff
    ↓
STOP
```

แผนต้องสั้น

ไม่ต้องสร้างแผน architecture ใหม่ถ้า task ไม่ต้องการ

---

# 6. TASK BOUNDARY

ทุก task ต้องตอบได้ว่า:

```text
What exactly is being changed?
What files are needed?
What behavior should change?
How will it be tested?
```

ถ้าคำตอบไม่ชัด:

```text
do not expand task
```

---

# 7. FILE RULES

ตัวอย่าง:

### Lexer task

อนุญาต:

```text
src/lexer.js
tests/lexer/*
```

ไม่ควรแก้:

```text
src/generator.js
runtime/*
```

### Parser task

อนุญาต:

```text
src/parser.js
src/ast.js
tests/parser/*
```

### Generator task

อนุญาต:

```text
src/generator.js
tests/generator/*
```

### Runtime task

อนุญาต:

```text
runtime/*
tests/runtime/*
```

ปรับตาม repository จริง แต่ต้องรักษา principle:

> แก้เฉพาะสิ่งที่เกี่ยวข้อง

---

# 8. TESTING RULE

ทุก feature ใหม่ต้องมี test ตามความเหมาะสม

ลำดับ:

```text
Targeted Test
    ↓
Related Tests
    ↓
Full Suite
```

ตัวอย่าง:

```bash
node --test tests/lexer/
```

จากนั้น:

```bash
node --test
```

---

# 9. FAILURE PROTOCOL

เมื่อ test fail:

```text
FAIL
 ↓
Read error
 ↓
Find root cause
 ↓
Make smallest fix
 ↓
Run failed test
 ↓
Run related tests
```

ห้าม:

```text
disable test
delete test
ignore failure
hide error
rewrite unrelated code
```

---

# 10. REGRESSION RULE

เมื่อพบ bug:

```text
Reproduce
→ Fix
→ Add regression test
→ Run test
```

ห้ามแก้ bug แบบชั่วคราวถ้าสามารถแก้ root cause ได้โดยไม่เพิ่มความซับซ้อน

---

# 11. SPEC COMPLIANCE

ก่อน commit หรือจบ task ให้ตรวจ:

```text
Does implementation match SPEC.md?
```

ต้องไม่มี behavior ที่ขัดกับ SPEC

ถ้า implementation และ SPEC ขัดกัน:

```text
STOP
```

อย่าตัดสินใจเปลี่ยน language behavior เอง

---

# 12. AST RULE

Compiler ต้องรักษา pipeline:

```text
Source
 ↓
Lexer
 ↓
Parser
 ↓
AST
 ↓
Validator
 ↓
Generator
 ↓
JavaScript
```

ห้าม bypass AST เพื่อแก้ปัญหาง่าย ๆ

ห้ามเพิ่ม special-case string replacement ใน compiler

---

# 13. JAVASCRIPT GENERATOR RULE

Generator ต้อง:

```text
deterministic
readable
valid JavaScript
```

Source เดิมควรได้ output ที่ deterministic

ห้าม generate behavior เพิ่มเอง

---

# 14. RUNTIME RULE

Runtime ต้องเล็ก

เพิ่ม runtime helper เมื่อ:

```text
TSL จำเป็นจริง
AND
JavaScript ไม่มี behavior นั้นโดยตรง
```

ห้ามสร้าง helper เพียงเพื่อ abstraction ที่ไม่จำเป็น

---

# 15. ENGINE RULE

Graphics API ต้องแยกจาก compiler

ตัวอย่าง:

```tsl
draw_rect(10, 20, 50, 50)
```

Generator เพียง generate:

```js
draw_rect(10, 20, 50, 50);
```

Compiler ไม่ต้องเข้าใจ implementation ของ renderer

---

# 16. DEPENDENCY RULE

ห้ามเพิ่ม npm dependency โดยไม่มี requirement

Preference:

```text
Node.js built-ins
+
small custom implementation
```

มากกว่า library ขนาดใหญ่

---

# 17. ARCHITECTURE RULE

ห้ามสร้าง:

```text
VM
bytecode
JIT
compiler plugin framework
type system
complex runtime
complex ECS
```

เพื่อแก้ปัญหาของ task เล็ก ๆ

ใช้ architecture ปัจจุบันก่อน

---

# 18. ERROR HANDLING

Error ต้องเป็น:

```text
specific
clear
actionable
```

ควรมี:

```text
filename
line
column
message
```

เมื่อข้อมูลพร้อม

ห้ามเปลี่ยน error architecture ใหญ่ ๆ ระหว่าง task เล็ก

---

# 19. DIFF REVIEW

ก่อนจบ task ต้องตรวจ diff

ถาม:

```text
Does every changed line belong to this task?
```

ถ้าไม่:

```text
remove unrelated change
```

ตรวจด้วย git เมื่อมี Git repository:

```bash
git diff
git status
```

---

# 20. NO PREMATURE REFACTOR

ห้าม refactor เพียงเพราะ:

```text
code could be cleaner
future feature might need it
architecture might scale better
```

Refactor เฉพาะเมื่อ:

```text
current task requires it
OR
existing code prevents correctness
```

---

# 21. NO FUTURE-PROOFING

ห้ามเขียน:

```text
generic framework
plugin interface
extensibility layer
abstract factory
complex registry
```

เพียงเพราะคิดว่าอนาคตอาจต้องใช้

TSL v1.0 ต้อง optimize เพื่อ:

```text
simplicity
correctness
clarity
```

ไม่ใช่ hypothetical future

---

# 22. PHASE CHECKPOINT

ทุก Phase ต้องมี checkpoint

ตัวอย่าง:

```text
PHASE CHECKPOINT

[ ] implementation complete
[ ] required tests pass
[ ] existing tests pass
[ ] SPEC respected
[ ] diff reviewed
```

เมื่อผ่านทั้งหมด:

```text
CHECKPOINT PASSED
STOP
```

---

# 23. DEFINITION OF DONE

Task ถือว่า DONE เมื่อ:

```text
[ ] requested behavior implemented
[ ] SPEC respected
[ ] no unnecessary feature
[ ] tests added/updated if needed
[ ] tests pass
[ ] existing behavior not broken
[ ] errors handled correctly
[ ] diff reviewed
```

---

# 24. WHEN SOMETHING IS AMBIGUOUS

ถ้า task หรือ SPEC กำกวม:

อย่าเติม behavior เอง

ใช้หลัก:

```text
1. Check SPEC.md
2. Check existing implementation
3. Check existing tests
4. Choose the smallest behavior only if unambiguous
5. Otherwise report the ambiguity
```

---

# 25. WHEN TESTS CONFLICT WITH SPEC

ลำดับ:

```text
SPEC
↓
Implementation
↓
Tests
```

ถ้า test ขัดกับ SPEC:

```text
do not silently change SPEC
```

ตรวจว่า test ล้าสมัยหรือ implementation ผิด

แก้ให้ระบบกลับมาตรงกับ SPEC

---

# 26. WHEN EXISTING CODE IS BAD

อย่า rewrite ทั้งระบบ

ใช้:

```text
minimal repair
```

เป้าหมาย:

```text
make current task correct
```

ไม่ใช่:

```text
rewrite project
```

---

# 27. COMMUNICATION

เมื่อจบ task ให้รายงานสั้น ๆ:

```text
Implemented:
- ...

Tests:
- ...

Result:
- PASS / FAIL

Files changed:
- ...
```

ถ้ามี issue:

```text
Blocked:
- ...
```

ห้ามอ้างว่างานเสร็จถ้ายังไม่ได้ verify

---

# 28. COMMAND SAFETY

ก่อนรัน command ที่อาจ:

```text
delete
overwrite
reset
destroy data
```

ต้องตรวจผลกระทบก่อน

ห้ามใช้คำสั่ง destructive โดยไม่จำเป็น

---

# 29. PERFORMANCE

อย่า optimize ก่อนมีหลักฐานว่าเป็นปัญหา

ลำดับ:

```text
Correctness
→ Tests
→ Simplicity
→ Performance
```

Compiler v1.0 ไม่มี optimizer

---

# 30. FINAL RELEASE CHECK

ก่อนถือว่า TSL v1.0 เสร็จ:

```text
[ ] SPEC.md complete
[ ] Lexer complete
[ ] Parser complete
[ ] AST complete
[ ] Validator complete
[ ] Generator complete
[ ] Runtime complete
[ ] Engine API complete
[ ] CLI complete
[ ] Tests pass
[ ] Integration tests pass
[ ] Examples work
[ ] Documentation complete
[ ] Clean build works
[ ] No known critical bug
```

---

# 31. ABSOLUTE RULE

เมื่อไม่แน่ใจระหว่าง:

```text
complex solution
```

และ:

```text
simple solution
```

ให้เลือก:

```text
simple solution
```

เมื่อไม่แน่ใจระหว่าง:

```text
add feature
```

และ:

```text
do not add feature
```

ให้เลือก:

```text
do not add feature
```

เมื่อไม่แน่ใจระหว่าง:

```text
guess
```

และ:

```text
stop and inspect
```

ให้เลือก:

```text
stop and inspect
```

---

# 32. Final Objective

Agent มีหน้าที่ทำให้:

```text
TSL v1.0
```

เป็นภาษาเล็กที่:

```text
correct
predictable
testable
documented
maintainable
```

ไม่ใช่การสร้างภาษาให้ใหญ่ที่สุด