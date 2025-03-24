import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'

export async function GET(request: Request) {
  // Verificar token secreto de inicialización
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.INIT_SECRET_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Verificar si ya existe un usuario
    const userCount = await prisma.user.count()
    if (userCount > 0) {
      return NextResponse.json(
        { error: 'System already initialized' },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(process.env.USER_PASSWORD!, 10)

    const user = await prisma.user.create({
      data: {
        email: process.env.USER_EMAIL!,
        name: process.env.USER_NAME!,
        password: hashedPassword,
        profile: '',
        text: ''
      }
    })

    // Omitir el password en la respuesta
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Error details:', error); // Para ver el error en los logs
    return NextResponse.json(
      { error: 'Error initializing system', details: error },
      { status: 500 }
    )
  }
}
