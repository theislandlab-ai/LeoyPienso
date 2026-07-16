const CONTENT_BASE = '/content/es/'

const TEXT_INDEX = [
  'expl-001', 'expl-002', 'expl-003', 'expl-004', 'expl-005',
  'expl-006', 'expl-007', 'expl-008', 'expl-009', 'expl-010',
  'avent-001', 'avent-002', 'avent-003', 'avent-004', 'avent-005',
  'avent-006', 'avent-007', 'avent-008', 'avent-009', 'avent-010',
  'avent-011', 'avent-012', 'avent-013', 'avent-014', 'avent-015',
]

export async function cargarTexto(id) {
  const resp = await fetch(`${CONTENT_BASE}${id}.json`)
  if (!resp.ok) throw new Error(`No se pudo cargar el texto: ${id}`)
  return resp.json()
}

export async function obtenerTextos() {
  return TEXT_INDEX
}

export async function cargarTextosPorNivel(nivel) {
  const prefix = nivel === 'exploradores' ? 'expl' : 'avent'
  const ids = TEXT_INDEX.filter(id => id.startsWith(prefix))
  const textos = await Promise.all(
    ids.map(id => cargarTexto(id).catch(() => null))
  )
  return textos.filter(Boolean)
}
