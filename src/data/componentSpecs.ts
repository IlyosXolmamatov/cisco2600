export interface ComponentSpec {
  label: string
  specs: Record<string, string>
  description: string
}

const specs: Record<string, ComponentSpec> = {
  'top-cover': {
    label: 'Top Cover / Lid',
    description: 'Stamped steel chassis lid providing EMI shielding and physical protection for internal components.',
    specs: {
      Material: 'Cold-rolled steel (1mm)',
      Finish: 'Zinc phosphate + powder coat',
      Dimensions: '445mm × 301mm',
      Weight: '~320g',
      'Ventilation Slots': '8 × stamped louvers',
    },
  },
  'base-frame': {
    label: 'Base Frame / Chassis',
    description: 'Rugged steel base frame and side panels form the structural backbone of the Cisco 2600 series.',
    specs: {
      Material: 'Heavy-gauge steel',
      Width: '444.5 mm (17.5")',
      Height: '43.2 mm (1.7")',
      Depth: '301 mm (11.85")',
      'Rack Units': '1U',
      'Mounting Type': 'EIA-310-D standard rack',
    },
  },
  pcb: {
    label: 'Motherboard / System PCB',
    description: 'Primary system board containing the CPU, memory interfaces, WIC slots, NM slot, and all bus logic for the Cisco 2600 platform.',
    specs: {
      'PCB Layers': '6-layer FR4',
      'Bus Width': '32-bit',
      'System Bus': 'Cisco IQ Bus',
      'WIC Slots': '2 × WAN Interface Card',
      'NM Slots': '1 × Network Module',
      'Flash Storage': '8–32 MB (SIMM)',
      'DRAM Support': 'Up to 64 MB',
    },
  },
  cpu: {
    label: 'CPU — Motorola MPC860',
    description: 'The heart of the Cisco 2600, a PowerPC-based processor optimized for embedded networking with integrated communication controller.',
    specs: {
      Architecture: 'PowerPC (MPC860)',
      Speed: '50–80 MHz',
      'Cache (L1)': '4 KB I-Cache / 4 KB D-Cache',
      Package: 'BGA-357',
      'Bus Speed': '50 MHz',
      'Instruction Set': 'PowerPC 32-bit RISC',
      Manufacturer: 'Motorola / Freescale',
    },
  },
  'boot-rom': {
    label: 'Boot ROM / NVRAM',
    description: 'Non-volatile ROM containing the Cisco bootstrap firmware (ROMmon) and NVRAM for startup configuration storage.',
    specs: {
      Type: 'PLCC Flash ROM',
      Capacity: '2 MB (ROM) + 32KB NVRAM',
      'Boot Software': 'Cisco ROMmon',
      Interface: 'Parallel flash',
      'Access Time': '70 ns',
      Voltage: '5V / 3.3V',
      Package: 'PLCC-32',
    },
  },
  'ram-0': {
    label: 'DRAM DIMM Slot 0',
    description: 'Primary DRAM slot. Cisco 2600 uses proprietary DRAM DIMMs for main system memory used by Cisco IOS.',
    specs: {
      Type: 'DRAM DIMM (proprietary)',
      'Default Size': '32 MB',
      'Max Per Slot': '32 MB',
      'Total Max': '64 MB (2 slots)',
      'Bus Width': '64-bit',
      Speed: 'PC66 / 66 MHz',
      Voltage: '3.3V',
    },
  },
  'ram-1': {
    label: 'DRAM DIMM Slot 1',
    description: 'Secondary DRAM expansion slot. Adding a second DIMM doubles system memory for running larger IOS feature sets.',
    specs: {
      Type: 'DRAM DIMM (proprietary)',
      'Default Size': 'Empty (optional)',
      'Max Per Slot': '32 MB',
      'Total Max': '64 MB (2 slots)',
      'Bus Width': '64-bit',
      Speed: 'PC66 / 66 MHz',
      Voltage: '3.3V',
    },
  },
  'wic-0': {
    label: 'WIC Slot 0 — WAN Interface Card',
    description: 'WAN Interface Card providing serial, ISDN BRI, DSL, or T1/E1 WAN connectivity. Hot-swappable on some variants.',
    specs: {
      'Card Type': 'WIC-1T / WIC-2T / WIC-1DSU-T1',
      Interface: 'Serial (DB-60 / Smart Serial)',
      'Max Speed': 'Up to 8 Mbps (serial)',
      Bus: 'WIC Bus (proprietary)',
      'Connector Type': 'Smart Serial or RJ-48',
      Power: '3.3V from system',
      'Hot-swap': 'No',
    },
  },
  'wic-1': {
    label: 'WIC Slot 1 — WAN Interface Card',
    description: 'Second WAN Interface Card slot for redundant or additional WAN links, supporting same WIC types as slot 0.',
    specs: {
      'Card Type': 'WIC-1T / WIC-2T / WIC-1DSU-T1',
      Interface: 'Serial / ISDN BRI',
      'Max Speed': 'Up to 8 Mbps (serial)',
      Bus: 'WIC Bus (proprietary)',
      'Connector Type': 'Smart Serial or RJ-48',
      Power: '3.3V from system',
      'Hot-swap': 'No',
    },
  },
  'nm-module': {
    label: 'Network Module (NM) Slot',
    description: 'High-bandwidth Network Module slot supporting Ethernet, Token Ring, ATM, voice, or VPN acceleration modules.',
    specs: {
      'Module Type': 'NM-1E / NM-4E / NM-1FE-TX',
      Interface: '10/100 Ethernet (module dependent)',
      Bus: 'High-Speed IQ Bus',
      'Max Bandwidth': '100 Mbps',
      Slot: '1 × NM slot',
      Power: '5V / 3.3V',
      'Hot-swap': 'No',
    },
  },
  psu: {
    label: 'Internal Power Supply Unit',
    description: 'Integrated switching PSU providing regulated DC voltages to all system components. Cisco 2600 uses a built-in PSU (no external brick needed).',
    specs: {
      Type: 'Inline switching PSU',
      'Input Voltage': '100–240V AC, 50/60Hz',
      'Output +5V': '5A',
      'Output +3.3V': '6A',
      'Output +12V': '1A',
      'Total Power': '~40W max',
      'Form Factor': 'Integrated (non-removable)',
    },
  },
}

export default specs
