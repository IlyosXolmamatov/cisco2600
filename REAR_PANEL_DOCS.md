# 🌐 Cisco 2600 Rear Panel Documentation

## 📐 Architecture Overview

The rear panel visualization is built with **React Three Fiber** and implements a professional, interactive 3D model of the Cisco 2600 router's rear interface section.

### Component Hierarchy

```
RearPanelScene (Main Container)
├── Main Chassis Rear Plate (brushed steel)
├── Perforated Mesh Texture Layer
├── Rack Ears (mounting brackets)
├── PowerGroup (AC Power Section)
│   ├── IEC C14 AC Inlet
│   └── SPST Rocker On/Off Switch
├── RJ45Group (Network Ports)
│   ├── CONSOLE Port (RJ-45)
│   ├── AUX Port (RJ-45)
│   └── ETHERNET 0/0 Port (RJ-45)
├── WICModuleGroup (WAN Interface Card Slot)
│   ├── Metallic Blue Module Panel
│   └── DB-60 Serial Connector (60-pin)
├── NMSlotGroup (Network Module Slot)
│   ├── Module Insertion Slot Interior
│   ├── Gold-plated Edge Connector
│   ├── Perforated Blank Cover Plate
│   └── Guide Rails
├── Top Cover Strip (ventilation louvres)
├── Bottom Strip (air intake vents)
├── Separation Seams (visual divisions)
└── ContactShadows (depth effect)
```

---

## 🎨 Materials & Textures

### Panel Base Materials

| Component | Color | Metalness | Roughness | Effect |
|-----------|-------|-----------|-----------|--------|
| **Rear Plate** | `#1f2229` | 0.75 | 0.55 | Brushed steel finish |
| **Perforations** | `#0d0f14` | 0.30 | 0.80 | Dark shadow recesses |
| **Rack Ears** | `#222530` | 0.80 | 0.40 | Polished metal support |
| **Guide Rails** | `#111318` | 0.65 | 0.60 | Matte steel |
| **Vent Louvres** | `#0d0f14` | 0.40 | 0.90 | Anti-glare slats |

### Interactive Component Materials

#### AC Power Group
```typescript
// IEC Inlet
color: #1a1a1a (black plastic)
metalness: 0.1
roughness: 0.85
emissiveIntensity: 0.35 (on hover)

// Rocker Switch
color: #111111 (matte black)
metalness: 0.05
roughness: 0.9
indicator: #ff2200 neon glow
```

#### RJ-45 Ports
```typescript
// Housing
color: #2a2a2a (dark gray plastic)
metalness: 0.05
roughness: 0.88

// Contact Pins
color: #d4aa30 (gold plated)
metalness: 0.95
roughness: 0.05

// LED Indicators
tx-led: #00ff44 (green)
rx-led: #ffaa00 (amber)
emissiveIntensity: 1.2-2.5 (based on state)
```

#### WIC-1T Module
```typescript
// Face Plate (metallic blue)
color: #1a3a6a
metalness: 0.82
roughness: 0.28
emissive: #112244 (blue glow)

// DB-60 Connector (60 pins in 3 rows)
shell: #2a2a3a
pins: #ccaa44 (gold)
emissiveIntensity: 0.45-0.55 (selected state)
```

#### NM Slot Blank
```typescript
// Cover Plate
color: #252830
metalness: 0.78
roughness: 0.48

// Perforations (9×4 grid)
color: #0d0f14
metalness: 0.5
roughness: 0.8

// Indicator LED
color: #ffaa44 (amber)
emissiveIntensity: 0.8-2.0
```

---

## 🔌 Component Details

### 1. AC Power Group (x ≈ +1.72)

**IEC C14 Inlet**
- 3-pin configuration: L (brown), N (blue), GND (green/yellow)
- Recessed cavity for connector
- Specifications:
  - Voltage: 100-240V AC (auto-sensing)
  - Current: 2A @ 240V / 4A @ 100V
  - Frequency: 50/60 Hz
  - Contacts: Gold-plated

**SPST Rocker Switch**
- I/O toggle (ON/OFF)
- Neon indicator lamp (red when powered)
- Specifications:
  - Rating: 10A @ 125V / 6A @ 250V
  - LED: Illuminated red neon dot
  - Position: To the left of inlet

### 2. RJ-45 Group (x ≈ +0.65)

Three ports laid out RIGHT-TO-LEFT:

#### Port 1: CONSOLE (Far Right)
- **Function**: CLI Management & Recovery
- **Standard**: EIA/TIA-232 (RS-232)
- **Connector**: RJ-45 (8P8C) with rollover cable
- **Baud Rate**: 9600 bps (configurable)
- **Label Color**: Cyan (`#00ccbb`)
- **Max Distance**: 15m (50ft)

#### Port 2: AUX (Center)
- **Function**: Auxiliary Management / Modem Connection
- **Standard**: EIA/TIA-232 with RTS/CTS handshaking
- **Connector**: RJ-45 (8P8C)
- **Baud Rate**: 115,200 bps (max)
- **Label Color**: Orange (`#ff8800`)
- **Features**: Hardware flow control support

#### Port 3: ETHERNET 0/0 (Far Left)
- **Function**: Internal LAN Interface
- **Standard**: IEEE 802.3 10BASE-T
- **Connector**: RJ-45 (8P8C)
- **Speed**: 10 Mbps (half/full duplex)
- **Label Color**: Yellow (`#ddcc00`)
- **Controller**: AMD Am79C965A LANCE
- **LED**: Green (link), Amber (activity)

**LED Indicators on Each Port**
- Top LED: Green for link status
- Bottom LED: Amber for TX/RX activity
- Brightness modulation based on interaction state

### 3. WIC Module Slot (x ≈ -0.28)

**WIC-1T: 1-Port Serials**
- **Connector Type**: HD-60 (Cisco proprietary DB-60 equivalent)
- **Pin Configuration**: 3 rows × 20 pins = 60 pins total
- **Physical Layer**: Supports EIA-232, V.35, X.21, EIA-449
- **Encapsulation**: HDLC, PPP, Frame Relay, X.25
- **Speed**: Up to 8 Mbps synchronous
- **Color**: Metallic blue (`#1a3a6a`)
- **Status LEDs**:
  - TX (Green): Transmission indicator
  - RX (Amber): Reception indicator

**Pin Layout** (DB-60 D-Sub)
```
Row 1 (20 pins):  ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓
Row 2 (20 pins):  ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓
Row 3 (20 pins):  ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓

Locking Posts: Left & Right (M3 screw mounting)
```

### 4. NM (Network Module) Slot (x ≈ -1.50)

**Blank Cover Plate (Included)**
- **Perforations**: 9 × 4 grid (36 holes, 6mm diameter)
- **Hole Spacing**: 100mm horizontal, 75mm vertical
- **Material**: Metallic steel with matte finish
- **Color**: Gray-blue (`#252830`)
- **Mounting**: 4× hand knobs/thumbscrews (manual removal)
- **Purpose**: Ventilation & module placeholder

**Edge Connector**
- **Gold-plated contacts**: 22 pins per row
- **Module insertion depth**: ~50mm
- **Guide rails**: Upper & lower (prevents tilting)
- **Bus Interface**: Cisco IQ High-Speed Bus
- **Max Throughput**: 100 Mbps (module-dependent)

**Compatible Modules**
- NM-1E (1× 10BASE-T Ethernet)
- NM-4E (4× 10BASE-T Ethernet)
- NM-1FE-TX (1× 100BASE-TX Fast Ethernet)
- NM-16ESW (16-port Ethernet Switch)
- NM-HDV (VoIP/Voice Module)

**Indicator LED**
- **Color**: Amber (`#ffaa44`)
- **State**: Glows dimly (indicates empty slot)
- **Brightness**: Increases on hover/selection

---

## 🖱️ Interactivity & Raycasting

### Hover Detection

All interactive elements use `onPointerOver` and `onPointerOut`:

```typescript
onPointerOver={(e) => {
  e.stopPropagation()
  setHovered(true)
}}
onPointerOut={() => setHovered(false)}
```

**Visual Feedback**:
- `emissiveIntensity: 0.35` on hover
- Smooth material transitions
- LED brightness increases

### Click Selection

```typescript
onClick={(e) => {
  e.stopPropagation()
  onSelect(id)
}}
```

**Selected State**:
- `emissiveIntensity: 0.5-0.7` (bright highlight)
- Component data appears in info panel
- Toggle: Click same component to deselect

### State Toggle: Toggle-by-ID Pattern

```typescript
handleRearSelect = (id: string) => {
  setRearSel(prev => prev === id ? null : id)
  setShowSpecs(true)
}
```

---

## 📋 Component Specifications Data

Each component has detailed specifications stored in `rearPanelSpecs.ts`:

```typescript
interface PortSpec {
  id: string                      // Unique identifier
  label: string                   // Display name (Uzbek)
  category: string                // Category (Power, Management, LAN, WAN, etc.)
  indicatorColor: string          // RGB color for status indicator
  description: string             // Long description (technical)
  specs: Record<string, string>   // Key-value specs table
}
```

### Example: Console Port

```javascript
{
  id: 'console',
  label: 'KONSOL Porti (RJ-45)',
  category: 'Boshqaruv',
  indicatorColor: '#00ccbb',
  description: 'EIA/TIA-232 asinxron seriyali boshqaruv porti...',
  specs: {
    Ulagich: 'RJ-45 (8P8C)',
    Standart: 'EIA/TIA-232 (RS-232)',
    'Baud Tezligi': '9600 baud (standart)',
    'Ma\'lumot Bitlari': '8',
    Paritet: 'Yo\'q',
    // ... more specs
  }
}
```

---

## 🎬 Animations & GSAP Integration

### Cover Open/Close Animation

```typescript
useEffect(() => {
  const tl = gsap.timeline()
  
  if (coverOpen) {
    // Top cover lifts up and slides back
    tl.to(topCoverRef.current.position, 
      { y: 0.8, duration: 0.7, ease: 'power2.out' }, 0)
    tl.to(topCoverRef.current.rotation, 
      { x: -0.35, duration: 0.7, ease: 'power2.out' }, 0)
    
    // NM cover tilts up and away
    tl.to(nmCoverRef.current.position, 
      { y: 0.7, z: 0.3, duration: 0.65, ease: 'power2.out' }, 0.1)
    tl.to(nmCoverRef.current.rotation, 
      { x: -0.6, duration: 0.65, ease: 'power2.out' }, 0.1)
  } else {
    // Reset positions (reverse animations)
  }
}, [coverOpen])
```

### Parameters
- **Duration**: 0.65-0.7 seconds
- **Easing**: `power2.inOut` / `power2.out`
- **Stagger**: 0.1s offset between cover elements

---

## 🖥️ UI Integration (HUD Overlay)

### RearPanelHUD Component

Located at: `src/components/RearPanelHUD.tsx`

**Features**:
1. **Control Bar** (top)
   - Open/Close Cover toggle
   - Reset View button
   - Rear Panel label

2. **Info Panel** (bottom-left)
   - Selected component details
   - Description text
   - Specifications grid
   - Indicator color badge

3. **Status Indicators** (right side)
   - Power status (PWR: NORMAL/COVER OPEN)
   - WIC status (WIC-1T: ACTIVE)
   - NM status (NM: EMPTY)
   - Ethernet status (ETH0/0: LINK)

**TailwindCSS Styling**:
```tailwind
bg-gray-900/90 backdrop-blur-sm
border-2 border-cyan-500
rounded-lg p-4
shadow-2xl
text-cyan-400 font-bold
```

---

## 📏 Dimensions & Layout (Scale: 1 unit = 10cm)

### Panel Overall
- **Width (W)**: 4.45 units (44.5 cm)
- **Height (H)**: 0.43 units (4.3 cm)
- **Depth (D)**: 0.06 units (6 cm)

### Component Positioning

```
RIGHT                            LEFT
[1.72]  [0.65]      [-0.28]      [-1.50]
 PWR     RJ45        WIC          NM SLOT
 ────    ────────    ────────     ───────
 0.72    0.78        1.05         1.35   (widths)

Gap ≈ 0.04-0.05 between groups
```

### Rack Ears
- Offset from panel: ±(W/2 + 0.14)
- Height: H × 0.9
- Thickness: 0.045

---

## 🔧 Technical Implementation

### File Structure
```
src/
├── components/
│   ├── rear/
│   │   ├── RearPanelScene.tsx      # Main container (191 lines)
│   │   ├── PowerGroup.tsx          # AC inlet + rocker switch
│   │   ├── RJ45Group.tsx           # 3× RJ-45 ports
│   │   ├── WICModuleGroup.tsx      # DB-60 connector module
│   │   └── NMSlotGroup.tsx         # NM blank cover plate
│   └── RearPanelHUD.tsx            # UI overlay panel
├── data/
│   └── rearPanelSpecs.ts           # Component specifications
└── App.tsx                          # View mode integration
```

### Key Technologies
- **React Three Fiber**: 3D scene management
- **Three.js**: WebGL rendering
- **GSAP**: Animation timeline
- **TailwindCSS**: UI styling
- **TypeScript**: Type safety

### Performance Optimizations
1. **InstancedMesh** for perforations (9×4×2 = 72 holes total)
2. **Lazy component loading** via React lazy/Suspense
3. **Shadow maps** at 2048×2048 resolution
4. **Material reuse** across similar components
5. **ContactShadows** for depth with blur optimization

---

## 🎯 Future Enhancements

- [ ] 3D module insertion animation (drag-and-drop)
- [ ] Fan speed visualization in vent louvres
- [ ] Temperature indicators on components
- [ ] Fiber optic port variants (SFP slots)
- [ ] Module swap support with hot-swap indication
- [ ] Telemetry data overlay (live interface stats)
- [ ] VR/AR compatibility for immersive inspection
- [ ] Multilingual spec sheets (currently Uzbek)

---

## 📚 References

- Cisco 2600 Series Hardware Installation Guide
- IEC 60320 C14 Connector Specifications
- EIA/TIA-232 Serial Interface Standards
- IEEE 802.3 Ethernet Specifications
- Cisco WIC-1T Module Datasheet
- Three.js Material Documentation
- GSAP Timeline API

---

**Last Updated**: April 21, 2026  
**Version**: 1.0 (Enhanced Rear Panel Release)  
**Status**: ✅ Production Ready
