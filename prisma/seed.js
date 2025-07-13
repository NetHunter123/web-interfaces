const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // === Очищення таблиці перед її заповненням ===

  await prisma.dailyConsumption.deleteMany()
  await prisma.meter.deleteMany()
  await prisma.tariff.deleteMany()
  await prisma.user.deleteMany()


  // === Користувачі ===
  const user1 = await prisma.user.create({
    data: {
      name: "Ivan Petrenko",
      email: "ivan@gmail.com",
      password: "03322475", // замініть на bcrypt хеш
      tariff: {create: {price: 2.64}}, // грн/кВт⋅год
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: "Olena Kovalenko",
      email: "olena@gmail.com",
      password: "03322475",
      tariff: {create: {price: 2.64}},
    },
  })

  const user3 = await prisma.user.create({
    data: {
      name: "Andrii Shevchenko",
      email: "andrii@gmail.com",
      password: "03322475",
      tariff: {create: {price: 2.64}},
    },
  })

  // === Лічильники ===
  const meter1 = await prisma.meter.create({data: {name: "Apartment Meter", userId: user1.id}})
  const meter2 = await prisma.meter.create({data: {name: "Home Meter 1", userId: user2.id}})
  const meter3 = await prisma.meter.create({data: {name: "Garage Meter 2", userId: user2.id}})
  const meter4 = await prisma.meter.create({data: {name: "Cottage Meter", userId: user3.id}})


  const dailyRecords = []

  function dailyRecordsCreator(meter, months) {
    const today = new Date()
    const startDate = new Date(today.getFullYear(), today.getMonth() - months, 1)

    const tempDailyRecords = []

    for (let i = 0; i < months * 30; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)

      tempDailyRecords.push({
        meterId: meter,
        date,
        kWh: parseFloat((Math.random() * (12 - 7) + 7).toFixed(2)), // 7.00–12.00 кВт⋅год
      })
    }

    return tempDailyRecords
  }

  dailyRecords.push(...dailyRecordsCreator(meter3.id,3))
  dailyRecords.push(...dailyRecordsCreator(meter2.id,3))
  dailyRecords.push(...dailyRecordsCreator(meter1.id,15))
  dailyRecords.push(...dailyRecordsCreator(meter4.id,7))


  await prisma.dailyConsumption.createMany({
    data: dailyRecords,
  })


  console.log(`✅ Inserted ${dailyRecords.length} daily records for meterIds`)

}

main()
.then(() => console.log("Seed completed."))
.catch((e) => {
  console.error(e)
  process.exit(1)
})
.finally(() => prisma.$disconnect())
