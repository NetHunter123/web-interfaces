import {NextResponse} from "next/server"
import {cookies} from "next/headers"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req, {params}) {
  const {id} = params

  // Дістаємо кукі з токеном
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  if (!token) {
    return NextResponse.json({error: "Не авторизовано"}, {status: 401})
  }

  try {
    // Знаходимо всі щоденні вимірювання по id лічильника

    const meter = await prisma.meter.findUnique({
      where: {id: Number(id)},
      include: {
        dailyRecords: {
          orderBy: {
            date: "asc", // або "desc" — за спаданням
          },
        }
      },
    });


    console.log("[id]route/record", meter)

    return NextResponse.json(({
      name: meter.name,
      records: meter.dailyRecords,
    }))
  } catch (error) {
    console.error("Помилка при отриманні даних:", error)
    return NextResponse.json({error: "Серверна помилка"}, {status: 500})
  }
}
