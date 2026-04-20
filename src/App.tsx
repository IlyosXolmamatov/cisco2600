import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import RouterScene from './components/RouterScene'
import specs from './data/componentSpecs'
import './index.css'

export default function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(false)
  const [isExploded, setIsExploded] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  const handleSelect = useCallback((id: string) => {
    setSelectedComponent(prev => prev === id ? null : id)
  }, [])

  const handleReset = () => {
    setIsCoverOpen(false)
    setIsExploded(false)
    setSelectedComponent(null)
  }

  const selected = selectedComponent ? specs[selectedComponent] : null

  return (
    <div className="w-screen h-screen bg-gray-950 relative overflow-hidden">
      {/* 3D Canvas */}
      <Canvas shadows className="w-full h-full">
        <PerspectiveCamera makeDefault position={[5, 3.5, 6]} fov={42} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.1}
          shadow-camera-far={30}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
        />
        <pointLight position={[-4, 2, -3]} intensity={0.5} color="#4488ff" />
        <pointLight position={[3, -1, 4]} intensity={0.3} color="#ffaa44" />

        <Environment preset="studio" />

        <RouterScene
          isCoverOpen={isCoverOpen}
          isExploded={isExploded}
          selectedComponent={selectedComponent}
          onSelect={handleSelect}
        />

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={14}
          maxPolarAngle={Math.PI * 0.85}
        />
      </Canvas>

      {/* Top HUD Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white font-mono text-sm font-bold tracking-widest uppercase">
              Cisco 2600 Series
            </span>
            <span className="text-gray-400 font-mono text-xs ml-2">Interactive 3D</span>
          </div>
          <div className="text-gray-500 font-mono text-xs mt-0.5">
            W: 44.5cm · H: 4.3cm · D: 30.1cm · 1U Rack
          </div>
        </div>

        {/* Controls */}
        <div className="pointer-events-auto flex gap-3">
          <button
            onClick={() => setIsCoverOpen(v => !v)}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
              isCoverOpen
                ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-900/80 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-300'
            }`}
          >
            {isCoverOpen ? 'Close Cover' : 'Open Cover'}
          </button>

          <button
            onClick={() => setIsExploded(v => !v)}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
              isExploded
                ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/30'
                : 'bg-gray-900/80 border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-300'
            }`}
          >
            {isExploded ? 'Collapse' : 'Explode'}
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 border bg-gray-900/80 border-gray-600 text-gray-300 hover:border-red-400 hover:text-red-300"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Component Info Panel */}
      <div
        className={`absolute top-20 right-6 w-72 transition-all duration-300 ${
          selected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
      >
        {selected && (
          <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-2xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">Selected Component</div>
                <h2 className="text-white font-semibold text-base leading-tight">{selected.label}</h2>
              </div>
              <button
                onClick={() => setSelectedComponent(null)}
                className="text-gray-500 hover:text-white text-lg leading-none mt-0.5 ml-2 transition-colors"
              >
                ×
              </button>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed mb-3 border-b border-gray-800 pb-3">
              {selected.description}
            </p>

            <div className="space-y-1.5">
              {Object.entries(selected.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between items-start gap-2">
                  <span className="text-gray-500 font-mono text-xs whitespace-nowrap">{key}</span>
                  <span className="text-gray-200 font-mono text-xs text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hint */}
      {!selected && (
        <div className="absolute bottom-6 left-6 text-gray-600 font-mono text-xs space-y-1 pointer-events-none">
          <div className="text-gray-500">Click any component to view specs</div>
          <div>Drag to orbit · Scroll to zoom · Right-drag to pan</div>
        </div>
      )}

      {/* Component list */}
      <div className="absolute bottom-6 right-6">
        <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-lg p-3 space-y-1">
          <div className="text-gray-500 font-mono text-xs uppercase tracking-wider mb-2">Components</div>
          {[
            { id: 'top-cover', label: 'Top Cover' },
            { id: 'base-frame', label: 'Base Frame' },
            { id: 'pcb', label: 'Motherboard' },
            { id: 'cpu', label: 'CPU (MPC860)' },
            { id: 'boot-rom', label: 'Boot ROM' },
            { id: 'ram-0', label: 'DRAM DIMM #0' },
            { id: 'ram-1', label: 'DRAM DIMM #1' },
            { id: 'wic-0', label: 'WIC Slot #0' },
            { id: 'wic-1', label: 'WIC Slot #1' },
            { id: 'nm-module', label: 'NM Module' },
            { id: 'psu', label: 'PSU' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              className={`block w-full text-left px-2 py-0.5 rounded font-mono text-xs transition-colors ${
                selectedComponent === id
                  ? 'text-blue-300 bg-blue-900/40'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${selectedComponent === id ? 'bg-blue-400' : 'bg-gray-700'}`} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* State indicators */}
      <div className="absolute top-20 left-6 space-y-2 pointer-events-none">
        <div className={`flex items-center gap-2 text-xs font-mono transition-opacity ${isCoverOpen ? 'opacity-100' : 'opacity-30'}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="text-blue-400">Cover Open</span>
        </div>
        <div className={`flex items-center gap-2 text-xs font-mono transition-opacity ${isExploded ? 'opacity-100' : 'opacity-30'}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="text-purple-400">Exploded View</span>
        </div>
      </div>
    </div>
  )
}
