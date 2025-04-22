# Dockerfile
FROM node:18

# ติดตั้ง PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client

# Set working dir เหมือนกับใน compose
WORKDIR /usr/src/app

# Copy source code (optional, ถ้ารันผ่าน volume ก็ไม่จำเป็น)
COPY . .

# Default command
CMD ["sh", "-c", "npm install && npm run dev"]
