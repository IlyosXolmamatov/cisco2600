import rearPanelSpecs from '../data/rearPanelSpecs'
import type { SpecGroup } from '../data/componentSpecs'

interface RearPanelHUDProps {
  selectedId: string | null
  rearCoverOpen: boolean
  onCoverToggle: () => void
  onReset: () => void
  onClearSelection?: () => void
}

const CATEGORY_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  JISMONIY:    { label: 'JISMONIY',    color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  TEXNIK:      { label: 'TEXNIK',      color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  FOYDALANISH: { label: 'FOYDALANISH', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
}

function SpecGroupBlock({ group }: { group: SpecGroup }) {
  const style = CATEGORY_STYLE[group.category] ?? { label: group.category, color: '#9ca3af', bg: 'rgba(156,163,175,0.1)' }
  return (
    <div className="mb-2">
      <div
        className="text-[9px] font-bold tracking-[0.15em] px-2 py-0.5 rounded mb-1 inline-block"
        style={{ color: style.color, background: style.bg }}
      >
        [{style.label}]
      </div>
      <div className="space-y-0.5">
        {group.fields.map((f) => (
          <div key={f.key} className="flex justify-between items-start gap-2">
            <span className="text-gray-500 text-[10px] whitespace-nowrap shrink-0">{f.key}</span>
            <span
              className="text-[10px] text-right leading-tight"
              style={{ color: f.bold ? '#e2e8f0' : '#94a3b8', fontWeight: f.bold ? 600 : 400 }}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Rear Panel HUD Overlay
 * 
 * TailwindCSS-based UI showing:
 * - Control buttons (Open Cover, Reset)
 * - Selected component info panel
 * - Port/component status indicators
 */
export default function RearPanelHUD({
  selectedId,
  rearCoverOpen,
  onCoverToggle,
  onReset,
  onClearSelection,
}: RearPanelHUDProps) {
  const selectedSpec = selectedId && rearPanelSpecs[selectedId]

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col p-6 font-mono text-xs">
      {/* Top Control Bar */}
      <div className="flex gap-3 mb-6 pointer-events-auto">
        <button
          onClick={onCoverToggle}
          className={`px-4 py-2 rounded font-bold transition-all ${
            rearCoverOpen
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
          }`}
        >
          {rearCoverOpen ? '◄ Close Cover' : '► Open Cover'}
        </button>
        
        <button
          onClick={onReset}
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white font-bold transition-all shadow-lg"
        >
          ↻ Reset View
        </button>

        <div className="flex-1" />

        <div className="bg-gray-900/80 backdrop-blur px-4 py-2 rounded border border-cyan-600/30 text-cyan-400">
          Rear Panel • Cisco 2600 Series Router
        </div>
      </div>

      {/* Bottom Info Panel */}
      <div className="mt-auto pointer-events-auto">
        {selectedSpec ? (
          <div className="bg-gray-900/90 backdrop-blur border-2 border-cyan-500 rounded-lg p-4 max-w-md shadow-2xl">
            {/* Header */}
            <div className="border-b border-cyan-600 pb-3 mb-3 flex justify-between items-start">
              <div>
                <div className="text-cyan-400 font-bold text-sm">{selectedSpec.label}</div>
                <div className="text-gray-400 text-xs mt-1">{selectedSpec.category}</div>
              </div>
              <button
                onClick={() => onClearSelection?.()}
                className="text-gray-400 hover:text-cyan-400 transition-colors text-lg leading-none"
                title="Yopish"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-3">
              {selectedSpec.description}
            </p>

            {/* Spec Groups */}
            <div className="bg-gray-950/50 p-2 rounded border border-cyan-900/30 max-h-48 overflow-y-auto">
              {selectedSpec.specGroups.map((group, idx) => (
                <SpecGroupBlock key={idx} group={group} />
              ))}
            </div>

            {/* Indicator */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cyan-900/30">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: selectedSpec.indicatorColor }}
              />
              <span className="text-gray-400 text-xs">Component Selected</span>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900/80 backdrop-blur border border-dashed border-gray-600 rounded-lg p-4 text-gray-500 text-xs max-w-md">
            💡 Click on any port or component to view details
            <div className="mt-2 text-gray-600">
              • AC Inlet • Rocker Switch • Console Port • AUX Port
              <br />• Ethernet 0/0 • WIC DB-60 • NM Slot Blank
            </div>
          </div>
        )}
      </div>

      {/* Component Status Indicators (Right Side) */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 space-y-2 pointer-events-auto">
        <div className="text-gray-500 text-xs font-bold mb-3">STATUS</div>

        {/* Power Status */}
        <div className="flex items-center gap-2 bg-gray-900/60 px-3 py-1 rounded border border-gray-700">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-gray-400">PWR: {rearCoverOpen ? 'COVER OPEN' : 'NORMAL'}</span>
        </div>

        {/* WIC Status */}
        <div className="flex items-center gap-2 bg-gray-900/60 px-3 py-1 rounded border border-gray-700">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-gray-400">WIC-1T: ACTIVE</span>
        </div>

        {/* NM Status */}
        <div className="flex items-center gap-2 bg-gray-900/60 px-3 py-1 rounded border border-gray-700">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
          <span className="text-gray-400">NM: EMPTY</span>
        </div>

        {/* Ethernet Status */}
        <div className="flex items-center gap-2 bg-gray-900/60 px-3 py-1 rounded border border-gray-700">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-gray-400">ETH0/0: LINK</span>
        </div>
      </div>
    </div>
  )
}
