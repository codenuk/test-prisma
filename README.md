- Run Node Version 14
- Section node JS With Express

- HTTP Method -> get, post, put, delete

sudo lsof -i:5432
sudo kill -15 523

 | **Name** | **Description** |
| --- | --- |
| `npm run prisma:generate` | For generate type of prisma. |
| `npx prisma migrate dev` | For migrate schema in local to database. |
| `npx prisma migrate deploy` | For migrate schema to production database. |

<hr />

## Oraginal Flow การ Export & Import Data ปกติโดยไม่มีการเปลัี่ยน Schema ในรูปแบบไฟล์ .sql
### Export Data
```bash
pg_dump -U postgres -d mydb -h postgres -F p -f backup.sql
```

### Clean Database & Import Data
```bash
psql -U postgres -h postgres -d mydb
```
```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

จากนั้นค่อยสั่ง restore:
```bash
psql -U postgres -h postgres -d mydb -f backup.sql
```

- U -> Username
- h -> Container name (docker)
- d -> Database name

Note: เป็นการล้าง data ทั้งหมดรวมถึง schema และทำการ import เข้าไปใหม่
<hr />

## Oraginal Flow การ Export & Import Data ปกติโดยไม่มีการเปลัี่ยน Schema ในรูปแบบไฟล์ .dump
### Export Data
```bash
pg_dump -U postgres -h postgres -d mydb -F c -f backup.dump
```

### Import Data
```bash
pg_restore -U postgres -h postgres -d mydb -c backup.dump
```


- -U -> Username
- -h -> Container name (docker)
- -d -> Database name
- -c → จะ drop ทุก object เดิม ก่อน restore (เหมือน reset database)

Note: เป็นการล้าง data ทั้งหมดรวมถึง schema และทำการ import เข้าไปใหม่
<hr />


Note: File .dump จะขนาดเล็กกว่า และ เร็วกว่าในการ export & import


<hr />

## วิธีการดีที่สุดคือการทำแบบนี้
ใช้ Prisma migration script (SQL ภายใน migration)
ให้ Prisma รู้ว่าเราจะแก้ค่า null ก่อน แล้วค่อยเปลี่ยน column

1. สั่ง generate migration แต่ยังไม่ apply
```bash
npx prisma migrate dev --create-only --name make-password-required
```
จะได้โฟลเดอร์ migration ใหม่เช่น:
```swift
prisma/migrations/20250423_make-password-required/
```
2. แก้ไฟล์ steps.sql ข้างใน เช่นแบบนี้:

-- step 1: update existing nulls
```sql
UPDATE "User" SET "password" = 'changeme' WHERE "password" IS NULL;
```

-- step 2: alter column
```sql
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
```
3. Apply migration
```bash
npx prisma migrate dev
```
🎯 แบบนี้ดีเพราะไม่มีการรัน SQL manual นอก Prisma และบันทึกไว้ใน migration history

<hr />

## วิธีนำข้อมูลจาก Excel เข้า PostgreSQL แบบปลอดภัยและเป็นระบบ
1. เตรียมข้อมูลใน Excel
ตัวอย่าง:
userID	name	email	password
abc123	Supagorn Siri	supagorn@gmail.com	changeme123
def456	Test User	test@example.com	testpass456
อย่าลืมว่า header ชื่อ column ต้องตรงกับชื่อใน DB (userID, name, email, password)

2. Export Excel เป็น CSV

```plaintext
userID,name,email,password
abc123,Supagorn Siri,supagorn@gmail.com,changeme123
def456,Test User,test@example.com,testpass456
```
Save As → CSV (Comma-separated values)

3. นำเข้า CSV เข้า PostgreSQL
ใช้ psql พร้อมคำสั่ง \copy:

```bash
psql -U postgres -h localhost -d mydb
```
แล้วใน prompt:

```sql
\copy "User"("userID", "name", "email", "password") FROM '/path/to/file.csv' DELIMITER ',' CSV HEADER;
```
หรือใช้ SQL ธรรมดา (เฉพาะกับ superuser):

```sql
COPY "User"("userID", "name", "email", "password") FROM '/absolute/path/to/file.csv' DELIMITER ',' CSV HEADER;
```
4. เช็คผลลัพธ์
```sql
SELECT * FROM "User";
```