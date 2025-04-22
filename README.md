- Run Node Version 14
- Section node JS With Express

- HTTP Method -> get, post, put, delete

sudo lsof -i:5432
sudo kill -15 523

 | **Name** | **Description** |
| --- | --- |
| `npm run dev` | For imprement API in local. |
| `npm run generate` | For generate type of graphql. |
| `npm run prisma:format` | For auto format in file `schema.prisma`. |
| `npm run prisma:generate` | For generate type of prisma. |
| `npx prisma migrate dev` | For migrate schema in local to database. |
| `npx prisma migrate deploy` | For migrate schema to production database. |
| `npm run test` | For run big test. |
| `npm run test:unit` | For run only unit test. |
| `npm run test:integration` | For run only integration test. |


TODO
- Test Flow Migrate Data and backup and restore
- Test Flow Migrate Data (case conflict) and backup and restore
- Write Inventory system


<hr />

# Oraginal Flow การ Export & Import Data ปกติโดยไม่มีการเปลัี่ยน Schema
## Export Data
```bash
pg_dump -U postgres -d mydb -h postgres -F c -f backup.dump
```

## Clean Database & Import Data
```bash
psql -U postgres -h postgres -d mydb -c \
"TRUNCATE TABLE \"User\", _prisma_migrations RESTART IDENTITY CASCADE;"
```
RESTART IDENTITY: reset auto-increment (sequence)

จากนั้นค่อยสั่ง restore:
```bash
pg_restore -U postgres -h postgres -d mydb --data-only --disable-triggers backup.dump
```
--disable-triggers: ปิด constraint ชั่วคราวระหว่าง copy

- U -> Username
- h -> Container name (docker)
- d -> Database name

<hr />