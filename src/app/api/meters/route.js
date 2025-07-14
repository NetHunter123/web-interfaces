import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();  // Ініціалізація Prisma


export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth-token');
  const raw = cookieStore.get('user');
  const user = JSON.parse(raw.value)
  const userId = user.id;

  if (!authToken) {
    // Користувач не авторизований – повертаємо 401
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const meters = await prisma.meter.findMany({
      where: {userId: Number(userId)},       // фільтр за ідентифікатором користувача
      select: {
        id: true,
        name: true,
        dailyRecords: {                    // або назва зв’язку відповідно до схеми
          orderBy: {date: 'desc'},           // сортуємо записи споживання за датою (спадний порядок)
          take: 1,                             // беремо лише 1 останній запис
          select: {
            date: true,
            kWh: true
          }
        }
      }
    });

    console.log("metersApi meters", meters);


    const result = meters.map(meter => {
      const last = meter.dailyRecords[0];  // останній запис або undefined
      return {
        id: meter.id,
        name: meter.name,
        lastDate: last ? last.date : null,
        lastKWh: last ? last.kWh : null
      };
    });

    console.log("metersApi result", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch meters:', error);
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }

  // ... (подальша логіка)
}
