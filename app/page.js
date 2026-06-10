'use client'
import { useState, useEffect } from 'react'

const EQUIPOS = [
  { nombre: 'Argentina', flag: '🇦🇷', grupo: 'A' },
  { nombre: 'Australia', flag: '🇦🇺', grupo: 'A' },
  { nombre: 'Egipto', flag: '🇪🇬', grupo: 'A' },
  { nombre: 'Ucrania', flag: '🇺🇦', grupo: 'A' },
  { nombre: 'España', flag: '🇪🇸', grupo: 'B' },
  { nombre: 'Croacia', flag: '🇭🇷', grupo: 'B' },
  { nombre: 'Marruecos', flag: '🇲🇦', grupo: 'B' },
  { nombre: 'Brasil', flag: '🇧🇷', grupo: 'C' },
  { nombre: 'México', flag: '🇲🇽', grupo: 'C' },
  { nombre: 'Polonia', flag: '🇵🇱', grupo: 'C' },
  { nombre: 'Francia', flag: '🇫🇷', grupo: 'D' },
  { nombre: 'Senegal', flag: '🇸🇳', grupo: 'D' },
  { nombre: 'Dinamarca', flag: '🇩🇰', grupo: 'D' },
  { nombre: 'Alemania', flag: '🇩🇪', grupo: 'E' },
  { nombre: 'Japón', flag: '🇯🇵', grupo: 'E' },
  { nombre: 'Costa Rica', flag: '🇨🇷', grupo: 'E' },
  { nombre: 'Portugal', flag: '🇵🇹', grupo: 'F' },
  { nombre: 'Uruguay', flag: '🇺🇾', grupo: 'F' },
  { nombre: 'Ghana', flag: '🇬🇭', grupo: 'F' },
  { nombre: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', grupo: 'G' },
  { nombre: 'Irán', flag: '🇮🇷', grupo: 'G' },
  { nombre: 'Ecuador', flag: '🇪🇨', grupo: 'G' },
  { nombre: 'Países Bajos', flag: '🇳🇱', grupo: 'H' },
  { nombre: 'Suiza', flag: '🇨🇭', grupo: 'H' },
  { nombre: 'Camerún', flag: '🇨🇲', grupo: 'H' },
  { nombre: 'Colombia', flag: '🇨🇴', grupo: 'I' },
  { nombre: 'Corea del Sur', flag: '🇰🇷', grupo: 'I' },
  { nombre: 'Venezuela', flag: '🇻🇪', grupo: 'I' },
  { nombre: 'Bélgica', flag: '🇧🇪', grupo: 'J' },
  { nombre: 'Italia', flag: '🇮🇹', grupo: 'J' },
  { nombre: 'Turquía', flag: '🇹🇷', grupo: 'J' },
  { nombre: 'Estados Unidos', flag: '🇺🇸', grupo: 'K' },
  { nombre: 'Panamá', flag: '🇵🇦', grupo: 'K' },
  { nombre: 'Honduras', flag: '🇭🇳', grupo: 'K' },
  { nombre: 'Canadá', flag: '🇨🇦', grupo: 'L' },
  { nombre: 'Serbia', flag: '🇷🇸', grupo: 'L' },
  { nombre: 'Chile', flag: '🇨🇱', grupo: 'L' },
  { nombre: 'Perú', flag: '🇵🇪', grupo: 'M' },
  { nombre: 'Bolivia', flag: '🇧🇴', grupo: 'M' },
  { nombre: 'Nigeria', flag: '🇳🇬', grupo: 'M' },
  { nombre: 'Portugal B', flag: '🇵🇹', grupo: 'N' },
  { nombre: 'Arabia Saudita', flag: '🇸🇦', grupo: 'N' },
  { nombre: 'Suecia', flag: '🇸🇪', grupo: 'N' },
  { nombre: 'Noruega', flag: '🇳🇴', grupo: 'O' },
  { nombre: 'Argelia', flag: '🇩🇿', grupo: 'O' },
  { nombre: 'Túnez', flag: '🇹🇳', grupo: 'O' },
  { nombre: 'El Salvador', flag: '🇸🇻', grupo: 'P' },
  { nombre: 'Guatemala', flag: '🇬🇹', grupo: 'P' },
]

const CIERRE = new Date('2026-06-28T00:00:00')
const ADMIN_PIN = '1234'

const COLORES = {
  navy: '#0E2233',
  azul: '#1a6fb5',
  azulClaro: '#e6f1fb',
  verde: '#27500a',
  verdeClaro: '#eaf3de',
  rojo: '#a32d2d',
  rojoClaro: '#fcebeb',
  gris: '#888780',
  grisFondo: '#f5f5f5',
  blanco: '#ffffff',
  borde: '#e0ddd5',
  texto: '#2C2C2A',
  textoSec: '#5F5E5A',
}

export default function Page() {
  const [data, setData] = useState({ participantes: [], campeon: null })
  const [vista, setVista] = useState('inicio') // inicio | registrar | tabla | admin
  const [nombre, setNombre] = useState('')
  const [equipoElegido, setEquipoElegido] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [adminPin, setAdminPin] = useState('')
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [campeonAdmin, setCampeonAdmin] = useState('')
  const [guardado, setGuardado] = useState(false)
  const [registroExitoso, setRegistroExitoso] = useState(false)
  const [yaRegistrado, setYaRegistrado] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('quiniela2026')
    if (raw) setData(JSON.parse(raw))
  }, [])

  function persist(newData) {
    setData(newData)
    localStorage.setItem('quiniela2026', JSON.stringify(newData))
  }

  const cerrado = new Date() > CIERRE
  const pozo = data.participantes.length * 100
  const ganadores = data.campeon
    ? data.participantes.filter(p => p.equipo === data.campeon)
    : []
  const premioIndividual = ganadores.length > 0 ? Math.floor(pozo / ganadores.length) : 0

  function buscarRegistro() {
    const n = nombre.trim().toLowerCase()
    const found = data.participantes.find(p => p.nombre.toLowerCase() === n)
    if (found) {
      setYaRegistrado(found)
      setVista('ya-registrado')
    } else {
      setVista('elegir')
    }
  }

  function registrar() {
    if (!nombre.trim() || !equipoElegido) return
    const nuevo = { nombre: nombre.trim(), equipo: equipoElegido, fecha: new Date().toISOString() }
    const newData = { ...data, participantes: [...data.participantes, nuevo] }
    persist(newData)
    setRegistroExitoso(true)
    setVista('exito')
  }

  function setearCampeon() {
    persist({ ...data, campeon: campeonAdmin })
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2000)
  }

  function loginAdmin() {
    if (adminPin === ADMIN_PIN) setAdminLoggedIn(true)
    else alert('PIN incorrecto')
  }

  const equiposFiltrados = EQUIPOS.filter(e =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const equiposUsados = new Set(data.participantes.map(p => p.equipo))

  const s = {
    container: { maxWidth: 520, margin: '0 auto', padding: '16px' },
    card: { background: COLORES.blanco, borderRadius: 16, border: `1px solid ${COLORES.borde}`, padding: '24px', marginBottom: 16 },
    title: { fontSize: 22, fontWeight: 600, color: COLORES.navy, marginBottom: 4 },
    sub: { fontSize: 14, color: COLORES.textoSec, marginBottom: 20 },
    label: { fontSize: 13, color: COLORES.textoSec, marginBottom: 6, display: 'block' },
    input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${COLORES.borde}`, fontSize: 14, boxSizing: 'border-box', marginBottom: 12, outline: 'none' },
    btnPrimary: { width: '100%', padding: '12px', borderRadius: 8, background: COLORES.azul, color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer' },
    btnSecondary: { width: '100%', padding: '10px', borderRadius: 8, background: 'transparent', color: COLORES.azul, border: `1px solid ${COLORES.azul}`, fontSize: 14, fontWeight: 500, cursor: 'pointer', marginTop: 8 },
    btnBack: { background: 'none', border: 'none', color: COLORES.azul, fontSize: 13, cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: 4 },
    pill: { display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500 },
    equipoBtn: (sel, usado) => ({
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
      borderRadius: 8, border: `1.5px solid ${sel ? COLORES.azul : usado ? COLORES.borde : COLORES.borde}`,
      background: sel ? COLORES.azulClaro : usado ? '#fafafa' : COLORES.blanco,
      cursor: usado && !sel ? 'default' : 'pointer',
      opacity: usado && !sel ? 0.5 : 1,
      marginBottom: 6, width: '100%', textAlign: 'left',
    }),
  }

  if (vista === 'inicio') return (
    <div style={s.container}>
      <div style={{ ...s.card, background: COLORES.navy, color: '#fff' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>⚽</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Quiniela Mundial 2026</div>
        <div style={{ fontSize: 14, opacity: 0.75, marginBottom: 20 }}>SSP Capital · Elige tu campeón</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          <span style={{ ...s.pill, background: 'rgba(255,255,255,0.15)', color: '#fff' }}>💰 $100 USD por persona</span>
          <span style={{ ...s.pill, background: 'rgba(255,255,255,0.15)', color: '#fff' }}>🏆 Ganador se lleva el pozo</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 14px', marginBottom: 20 }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>Participantes registrados</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{data.participantes.length}</div>
          <div style={{ fontSize: 13, opacity: 0.7 }}>Pozo acumulado: <strong>${pozo.toLocaleString()} USD</strong></div>
        </div>
        {data.campeon && (
          <div style={{ background: '#faeeda', borderRadius: 10, padding: '12px 14px', marginBottom: 16, color: COLORES.navy }}>
            <div style={{ fontSize: 12, color: COLORES.textoSec, marginBottom: 2 }}>🏆 Campeón oficial</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>
              {EQUIPOS.find(e => e.nombre === data.campeon)?.flag} {data.campeon}
            </div>
            {ganadores.length > 0 && (
              <div style={{ fontSize: 13, marginTop: 4 }}>
                {ganadores.length === 1
                  ? `🎉 Ganador: ${ganadores[0].nombre} — $${premioIndividual.toLocaleString()} USD`
                  : `🎉 ${ganadores.length} ganadores comparten $${pozo.toLocaleString()} USD`}
              </div>
            )}
            {ganadores.length === 0 && <div style={{ fontSize: 13, marginTop: 4 }}>😬 Nadie eligió a este campeón. Pozo congelado.</div>}
          </div>
        )}
        {cerrado
          ? <div style={{ fontSize: 13, opacity: 0.7, textAlign: 'center', padding: '8px 0' }}>⏰ Registro cerrado</div>
          : <div style={{ fontSize: 12, opacity: 0.6, textAlign: 'center' }}>Cierre: 28 de junio de 2026</div>}
      </div>

      {!cerrado && (
        <button style={s.btnPrimary} onClick={() => setVista('nombre')}>
          Registrar mi pick →
        </button>
      )}
      <button style={s.btnSecondary} onClick={() => setVista('tabla')}>
        Ver tabla de participantes
      </button>
      <button style={{ ...s.btnSecondary, marginTop: 8, color: COLORES.textoSec, borderColor: COLORES.borde }} onClick={() => setVista('admin')}>
        Panel admin
      </button>
    </div>
  )

  if (vista === 'nombre') return (
    <div style={s.container}>
      <button style={s.btnBack} onClick={() => setVista('inicio')}>← Volver</button>
      <div style={s.card}>
        <div style={s.title}>¿Cuál es tu nombre?</div>
        <div style={s.sub}>Ingresa tu nombre completo para registrar tu pick.</div>
        <label style={s.label}>Nombre completo</label>
        <input
          style={s.input}
          placeholder="Ej. Carlos Rodríguez"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && nombre.trim() && buscarRegistro()}
          autoFocus
        />
        <button style={s.btnPrimary} onClick={buscarRegistro} disabled={!nombre.trim()}>
          Continuar →
        </button>
      </div>
    </div>
  )

  if (vista === 'ya-registrado') return (
    <div style={s.container}>
      <button style={s.btnBack} onClick={() => { setVista('inicio'); setNombre('') }}>← Volver</button>
      <div style={s.card}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
        <div style={s.title}>Ya estás registrado</div>
        <div style={s.sub}>Tu pick ya fue guardado anteriormente.</div>
        <div style={{ background: COLORES.azulClaro, borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: COLORES.textoSec, marginBottom: 4 }}>Tu selección</div>
          <div style={{ fontSize: 22 }}>{EQUIPOS.find(e => e.nombre === yaRegistrado?.equipo)?.flag}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: COLORES.navy }}>{yaRegistrado?.equipo}</div>
        </div>
        {data.campeon && (
          <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: yaRegistrado?.equipo === data.campeon ? COLORES.verdeClaro : COLORES.rojoClaro, color: yaRegistrado?.equipo === data.campeon ? COLORES.verde : COLORES.rojo, textAlign: 'center', fontWeight: 600 }}>
            {yaRegistrado?.equipo === data.campeon ? '🎉 ¡Acertaste! Eres ganador' : '😢 No acertaste esta vez'}
          </div>
        )}
        <button style={{ ...s.btnSecondary, marginTop: 16 }} onClick={() => setVista('tabla')}>
          Ver tabla completa
        </button>
      </div>
    </div>
  )

  if (vista === 'elegir') return (
    <div style={s.container}>
      <button style={s.btnBack} onClick={() => setVista('nombre')}>← Volver</button>
      <div style={s.card}>
        <div style={s.title}>Elige tu campeón</div>
        <div style={s.sub}>Hola <strong>{nombre}</strong>. Selecciona el equipo que crees que ganará el Mundial FIFA 2026.</div>
        <input
          style={s.input}
          placeholder="🔍 Buscar equipo..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <div style={{ maxHeight: 340, overflowY: 'auto', marginBottom: 16 }}>
          {equiposFiltrados.map(eq => {
            const sel = equipoElegido === eq.nombre
            const usado = equiposUsados.has(eq.nombre) && !sel
            return (
              <button
                key={eq.nombre}
                style={s.equipoBtn(sel, usado)}
                onClick={() => !usado && setEquipoElegido(eq.nombre)}
                disabled={usado}
              >
                <span style={{ fontSize: 22 }}>{eq.flag}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: sel ? 600 : 400, color: sel ? COLORES.azul : COLORES.texto }}>
                  {eq.nombre}
                </span>
                {usado && <span style={{ fontSize: 11, color: COLORES.gris }}>tomado</span>}
                {sel && <span style={{ fontSize: 16 }}>✓</span>}
              </button>
            )
          })}
        </div>
        {equipoElegido && (
          <div style={{ background: COLORES.azulClaro, borderRadius: 8, padding: '10px 14px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>{EQUIPOS.find(e => e.nombre === equipoElegido)?.flag}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: COLORES.azul }}>Seleccionado: {equipoElegido}</span>
          </div>
        )}
        <button style={s.btnPrimary} onClick={registrar} disabled={!equipoElegido}>
          Confirmar mi pick →
        </button>
      </div>
    </div>
  )

  if (vista === 'exito') return (
    <div style={s.container}>
      <div style={s.card}>
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
          <div style={s.title}>¡Pick registrado!</div>
          <div style={s.sub}>Tu selección quedó guardada.</div>
          <div style={{ background: COLORES.azulClaro, borderRadius: 12, padding: '16px', margin: '16px 0', display: 'inline-block', minWidth: 180 }}>
            <div style={{ fontSize: 13, color: COLORES.textoSec, marginBottom: 4 }}>Tu campeón</div>
            <div style={{ fontSize: 32 }}>{EQUIPOS.find(e => e.nombre === equipoElegido)?.flag}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORES.navy, marginTop: 4 }}>{equipoElegido}</div>
          </div>
          <div style={{ fontSize: 13, color: COLORES.textoSec, marginBottom: 20 }}>
            Pozo actual: <strong>${(data.participantes.length * 100).toLocaleString()} USD</strong>
          </div>
          <button style={s.btnPrimary} onClick={() => { setVista('tabla') }}>
            Ver tabla de participantes
          </button>
          <button style={s.btnSecondary} onClick={() => { setVista('inicio'); setNombre(''); setEquipoElegido(null); setBusqueda('') }}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )

  if (vista === 'tabla') return (
    <div style={s.container}>
      <button style={s.btnBack} onClick={() => setVista('inicio')}>← Volver</button>
      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={s.title}>Participantes</div>
            <div style={s.sub}>{data.participantes.length} registrados · Pozo: ${pozo.toLocaleString()} USD</div>
          </div>
          {data.campeon && (
            <span style={{ ...s.pill, background: '#faeeda', color: '#633806' }}>
              🏆 {data.campeon}
            </span>
          )}
        </div>
        {data.participantes.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: COLORES.textoSec, fontSize: 14 }}>
            Aún no hay participantes registrados.
          </div>
        )}
        {data.participantes.map((p, i) => {
          const esGanador = data.campeon && p.equipo === data.campeon
          const eq = EQUIPOS.find(e => e.nombre === p.equipo)
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
              borderBottom: i < data.participantes.length - 1 ? `1px solid ${COLORES.borde}` : 'none'
            }}>
              <span style={{ fontSize: 24 }}>{eq?.flag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: COLORES.texto }}>{p.nombre}</div>
                <div style={{ fontSize: 12, color: COLORES.textoSec }}>{p.equipo}</div>
              </div>
              {esGanador && (
                <span style={{ ...s.pill, background: COLORES.verdeClaro, color: COLORES.verde }}>🏆 Ganador</span>
              )}
            </div>
          )
        })}
        {data.campeon && ganadores.length === 0 && (
          <div style={{ marginTop: 16, padding: '12px 14px', borderRadius: 8, background: COLORES.rojoClaro, color: COLORES.rojo, fontSize: 13 }}>
            😬 Nadie eligió a <strong>{data.campeon}</strong>. El pozo de <strong>${pozo.toLocaleString()} USD</strong> queda congelado.
          </div>
        )}
        {data.campeon && ganadores.length > 1 && (
          <div style={{ marginTop: 16, padding: '12px 14px', borderRadius: 8, background: COLORES.verdeClaro, color: COLORES.verde, fontSize: 13 }}>
            🎉 {ganadores.length} ganadores comparten el pozo. Cada uno recibe <strong>${premioIndividual.toLocaleString()} USD</strong>.
          </div>
        )}
      </div>
    </div>
  )

  if (vista === 'admin') return (
    <div style={s.container}>
      <button style={s.btnBack} onClick={() => setVista('inicio')}>← Volver</button>
      <div style={s.card}>
        <div style={s.title}>Panel administrador</div>
        {!adminLoggedIn ? (
          <>
            <div style={s.sub}>Ingresa el PIN de administrador.</div>
            <label style={s.label}>PIN</label>
            <input
              style={s.input}
              type="password"
              placeholder="••••"
              value={adminPin}
              onChange={e => setAdminPin(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && loginAdmin()}
            />
            <button style={s.btnPrimary} onClick={loginAdmin}>Entrar</button>
          </>
        ) : (
          <>
            <div style={{ background: COLORES.grisFondo, borderRadius: 10, padding: '12px 14px', marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: COLORES.textoSec }}>Participantes: <strong>{data.participantes.length}</strong></div>
              <div style={{ fontSize: 12, color: COLORES.textoSec }}>Pozo total: <strong>${pozo.toLocaleString()} USD</strong></div>
            </div>
            <label style={s.label}>Declarar campeón oficial</label>
            <select
              style={{ ...s.input, marginBottom: 12 }}
              value={campeonAdmin}
              onChange={e => setCampeonAdmin(e.target.value)}
            >
              <option value="">— Seleccionar equipo —</option>
              {EQUIPOS.map(eq => (
                <option key={eq.nombre} value={eq.nombre}>
                  {eq.flag} {eq.nombre}
                </option>
              ))}
            </select>
            <button style={s.btnPrimary} onClick={setearCampeon} disabled={!campeonAdmin}>
              {guardado ? '✓ Guardado' : 'Guardar campeón'}
            </button>
            {data.campeon && (
              <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: COLORES.azulClaro, color: COLORES.azul, fontSize: 13 }}>
                Campeón actual: <strong>{data.campeon}</strong>
                {ganadores.length > 0
                  ? ` · ${ganadores.length} ganador(es)`
                  : ' · Nadie eligió este equipo'}
              </div>
            )}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10, color: COLORES.texto }}>Todos los picks</div>
              {data.participantes.length === 0 && <div style={{ fontSize: 13, color: COLORES.textoSec }}>Sin participantes aún.</div>}
              {data.participantes.map((p, i) => {
                const eq = EQUIPOS.find(e => e.nombre === p.equipo)
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${COLORES.borde}`, fontSize: 13 }}>
                    <span>{eq?.flag}</span>
                    <span style={{ flex: 1 }}>{p.nombre}</span>
                    <span style={{ color: COLORES.textoSec }}>{p.equipo}</span>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )

  return null
}
