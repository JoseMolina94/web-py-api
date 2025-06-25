import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { functionName, var1, var2 } = body

    const response = await fetch('http://localhost:8000/execute-function', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        function: functionName,
        var1,
        var2
      })
    })

    const text = await response.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ error: 'Respuesta inválida del servidor Python' }, { status: 500 })
    }

    if (!response.ok) {
      return NextResponse.json({ error: data.detail || 'Error en la API de Python' }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'No se pudo conectar con la API de Python' }, { status: 500 })
  }
}