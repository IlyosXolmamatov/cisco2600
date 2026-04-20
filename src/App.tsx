import { useState, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import RouterScene from './components/RouterScene'
import RearPanelScene, { type RearPanelSceneHandle } from './components/rear/RearPanelScene'
import FullRouterScene from './components/FullRouterScene'
import specs from './data/componentSpecs'
import rearSpecs from './data/rearPanelSpecs'
import './index.css'

type ViewMode = 'router' | 'rear-panel' | 'combined'

export default function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(false)
  const [isExploded, setIsExploded]   = useState(false)
  const [routerSel, setRouterSel]     = useState<string | null>(null)

  const [rearCoverOpen, setRearCoverOpen] = useState(false)
  const [rearSel, setRearSel]             = useState<string | null>(null)
  const [showSpecs, setShowSpecs]         = useState(true)
  const rearSceneRef = useRef<RearPanelSceneHandle>(null)

  const [viewMode, setViewMode] = useState<ViewMode>('combined')

  const handleRouterSelect = useCallback((id: string) => {
    setRouterSel(prev => prev === id ? null : id)
  }, [])

  const handleRearSelect = useCallback((id: string) => {
    setRearSel(prev => prev === id ? null : id)
    setShowSpecs(true)
  }, [])

  const handleRouterReset = () => {
    setIsCoverOpen(false)
    setIsExploded(false)
    setRouterSel(null)
  }

  const handleRearReset = () => {
    setRearCoverOpen(false)
    setRearSel(null)
    rearSceneRef.current?.resetCamera()
  }

  const switchView = (mode: ViewMode) => {
    setViewMode(mode)
    setRouterSel(null)
    setRearSel(null)
  }

  const routerSelected = routerSel ? specs[routerSel] : null
  const rearSelected   = rearSel   ? rearSpecs[rearSel] : null
  const isRear         = viewMode === 'rear-panel'
  const isCombined     = viewMode === 'combined'

  return (
    <div className="w-screen h-screen bg-gray-950 relative overflow-hidden">

      {/* ══════ 3D Sahna ══════ */}
      <Canvas shadows className="w-full h-full" key={viewMode}>
        {isCombined ? (
          <>
            <PerspectiveCamera makeDefault position={[7, 2, 3]} fov={42} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 8, 4]} intensity={1.3} castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-near={0.1} shadow-camera-far={50}
              shadow-camera-left={-10} shadow-camera-right={10}
              shadow-camera-top={10}  shadow-camera-bottom={-10}
            />
            <pointLight position={[-5, 2, 2]} intensity={0.6} color="#4488ff" />
            <pointLight position={[5, -1, -3]} intensity={0.5} color="#ffaa44" />
            <Environment preset="studio" />
            <FullRouterScene
              isCoverOpen={isCoverOpen}
              rearCoverOpen={rearCoverOpen}
              isExploded={isExploded}
              selectedComponent={routerSel}
              selectedRear={rearSel}
              onSelectRouter={handleRouterSelect}
              onSelectRear={handleRearSelect}
            />
          </>
        ) : isRear ? (
          <>
            <PerspectiveCamera makeDefault position={[0, 0.2, 5.2]} fov={38} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 4, 6]} intensity={1.4} castShadow
              shadow-mapSize={[2048, 2048]} />
            <pointLight position={[-3, 1, 3]} intensity={0.6} color="#6699ff" />
            <pointLight position={[3, -1, 4]} intensity={0.4} color="#ffcc88" />
            <Environment preset="studio" />
            <RearPanelScene
              ref={rearSceneRef}
              selectedId={rearSel}
              onSelect={handleRearSelect}
              coverOpen={rearCoverOpen}
            />
          </>
        ) : (
          <>
            <PerspectiveCamera makeDefault position={[5, 3.5, 6]} fov={42} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-near={0.1} shadow-camera-far={30}
              shadow-camera-left={-6} shadow-camera-right={6}
              shadow-camera-top={6}  shadow-camera-bottom={-6}
            />
            <pointLight position={[-4, 2, -3]} intensity={0.5} color="#4488ff" />
            <pointLight position={[3, -1, 4]}  intensity={0.3} color="#ffaa44" />
            <Environment preset="studio" />
            <RouterScene
              isCoverOpen={isCoverOpen}
              isExploded={isExploded}
              selectedComponent={routerSel}
              onSelect={handleRouterSelect}
            />
          </>
        )}
        <OrbitControls
          enableDamping dampingFactor={0.05}
          minDistance={isCombined ? 3 : isRear ? 1.5 : 2}
          maxDistance={isCombined ? 25 : isRear ? 12 : 14}
          maxPolarAngle={Math.PI * 0.85}
        />
      </Canvas>

      {/* ══════ Ko'rinish rejimi paneli ══════ */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3 pointer-events-none">

        {/* Chap: brend + tablar */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white font-mono text-sm font-bold tracking-widest uppercase">
                Cisco 2600 Seriyasi
              </span>
            </div>
            <div className="text-gray-500 font-mono text-xs mt-0.5">
              Kenglik: 44.5sm · Balandlik: 4.3sm · Chuqurlik: 30.1sm · 1U Stend
            </div>
          </div>

          {/* Ko'rinish tablari */}
          <div className="flex ml-4 gap-1 border border-gray-700 rounded-lg p-0.5 bg-gray-900/70">
            {(['combined', 'router', 'rear-panel'] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchView(m)}
                className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold tracking-wider transition-all ${
                  viewMode === m
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {m === 'combined' ? '🔄 Birlashgan' : m === 'router' ? "To'liq Router" : 'Orqa Panel'}
              </button>
            ))}
          </div>
        </div>

        {/* O'ng: boshqaruv tugmalari */}
        <div className="pointer-events-auto flex gap-2">
          {isCombined ? (
            <>
              <button
                onClick={() => setIsCoverOpen(v => !v)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all border ${
                  isCoverOpen
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-900/80 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-300'
                }`}
              >
                {isCoverOpen ? 'Qopqoqni Yop' : 'Qopqoqni Och'}
              </button>
              <button
                onClick={() => setRearCoverOpen(v => !v)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all border ${
                  rearCoverOpen
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-gray-900/80 border-gray-600 text-gray-300 hover:border-indigo-400 hover:text-indigo-300'
                }`}
              >
                {rearCoverOpen ? 'Orqani Yop' : 'Orqani Och'}
              </button>
              <button
                onClick={() => setIsExploded(v => !v)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all border ${
                  isExploded
                    ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-900/80 border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-300'
                }`}
              >
                {isExploded ? "Yig'ish" : 'Parchalash'}
              </button>
              <button
                onClick={() => {
                  handleRouterReset()
                  handleRearReset()
                }}
                className="px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all border bg-gray-900/80 border-gray-600 text-gray-300 hover:border-red-400 hover:text-red-300"
              >
                Qayta Tiklash
              </button>
            </>
          ) : isRear ? (
            <>
              <button
                onClick={() => setRearCoverOpen(v => !v)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all border ${
                  rearCoverOpen
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-900/80 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-300'
                }`}
              >
                {rearCoverOpen ? 'Qopqoqni Yop' : 'Qopqoqni Och'}
              </button>
              <button
                onClick={() => setShowSpecs(v => !v)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all border ${
                  showSpecs && rearSel
                    ? 'bg-emerald-700 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-gray-900/80 border-gray-600 text-gray-300 hover:border-emerald-400 hover:text-emerald-300'
                }`}
              >
                Xususiyatlar
              </button>
              <button
                onClick={handleRearReset}
                className="px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all border bg-gray-900/80 border-gray-600 text-gray-300 hover:border-red-400 hover:text-red-300"
              >
                Kamerani Tiklash
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsCoverOpen(v => !v)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all border ${
                  isCoverOpen
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-900/80 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-300'
                }`}
              >
                {isCoverOpen ? 'Qopqoqni Yop' : 'Qopqoqni Och'}
              </button>
              <button
                onClick={() => setIsExploded(v => !v)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all border ${
                  isExploded
                    ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-900/80 border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-300'
                }`}
              >
                {isExploded ? "Yig'ish" : 'Parchalash'}
              </button>
              <button
                onClick={handleRouterReset}
                className="px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all border bg-gray-900/80 border-gray-600 text-gray-300 hover:border-red-400 hover:text-red-300"
              >
                Qayta Tiklash
              </button>
            </>
          )}
        </div>
      </div>

      {/* ══════ Xususiyatlar paneli — Orqa panel ══════ */}
      {(isRear || isCombined) && (
        <div className={`absolute top-20 right-6 w-76 transition-all duration-300 ${
          rearSelected && showSpecs ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}>
          {rearSelected && (
            <div className="bg-gray-900/92 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-2xl w-76">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: rearSelected.indicatorColor }}
                />
                <span className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: rearSelected.indicatorColor }}>
                  {rearSelected.category}
                </span>
                <button
                  onClick={() => setRearSel(null)}
                  className="ml-auto text-gray-500 hover:text-white text-base transition-colors"
                >×</button>
              </div>

              <h2 className="text-white font-semibold text-sm leading-tight mb-2">
                {rearSelected.label}
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed mb-3 border-b border-gray-800 pb-3">
                {rearSelected.description}
              </p>
              <div className="space-y-1.5">
                {Object.entries(rearSelected.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-start gap-2">
                    <span className="text-gray-500 font-mono text-xs whitespace-nowrap">{k}</span>
                    <span className="text-gray-200 font-mono text-xs text-right leading-tight">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════ Xususiyatlar paneli — Router ══════ */}
      {(!isRear && routerSelected && (
        <div className={`absolute top-20 right-6 w-72 transition-all duration-300 ${
          routerSelected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}>
          {routerSelected && (
            <div className="bg-gray-900/92 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-2xl w-72">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-cyan-500" />
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-500">
                   {routerSel && specs[routerSel] ? specs[routerSel].label.split(' ')[0] : 'KOMPONENT'}
                </span>
                <button
                  onClick={() => setRouterSel(null)}
                  className="ml-auto text-gray-500 hover:text-white text-base transition-colors"
                >×</button>
              </div>

              <h2 className="text-white font-semibold text-sm leading-tight mb-2">
                {routerSelected.label}
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed mb-3 border-b border-gray-800 pb-3">
                {routerSelected.description}
              </p>
              <div className="space-y-1.5">
                {Object.entries(routerSelected.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-start gap-2">
                    <span className="text-gray-500 font-mono text-xs whitespace-nowrap">{k}</span>
                    <span className="text-gray-200 font-mono text-xs text-right leading-tight">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
