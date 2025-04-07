import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // caminho pro client configurado
import { startOfDay, endOfDay } from 'date-fns'

export async function POST(req: Request) {
  const { hours } = await req.json()
  if (!hours || hours <= 0) {
    return NextResponse.json({ error: 'Horas inválidas' }, { status: 400 })
  }

  const today = new Date()
  const start = startOfDay(today)
  const end = endOfDay(today)

  // verifica se já existe registro hoje
  const existing = await prisma.hourLog.findFirst({
    where: {
      day: {
        gte: start,
        lte: end
      }
    }
  })

  let updatedLog
  if (existing) {
    updatedLog = await prisma.hourLog.update({
      where: { id: existing.id },
      data: {
        total: existing.total + hours
      }
    })
  } else {
    updatedLog = await prisma.hourLog.create({
      data: {
        day: today,
        total: hours
      }
    })
  }

  return NextResponse.json({ success: true, data: updatedLog })
}
