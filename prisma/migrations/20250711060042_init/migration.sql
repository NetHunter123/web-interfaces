-- CreateTable
CREATE TABLE "Meter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Meter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DailyConsumption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "meterId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "kWh" REAL NOT NULL,
    CONSTRAINT "DailyConsumption_meterId_fkey" FOREIGN KEY ("meterId") REFERENCES "Meter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MonthlyConsumption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "meterId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "kWh" REAL NOT NULL,
    CONSTRAINT "MonthlyConsumption_meterId_fkey" FOREIGN KEY ("meterId") REFERENCES "Meter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tariff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "Tariff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyConsumption_meterId_date_key" ON "DailyConsumption"("meterId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyConsumption_meterId_month_year_key" ON "MonthlyConsumption"("meterId", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Tariff_userId_key" ON "Tariff"("userId");
