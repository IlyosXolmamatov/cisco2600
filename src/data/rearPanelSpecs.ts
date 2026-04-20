export interface PortSpec {
  id: string
  label: string
  category: string
  indicatorColor: string
  description: string
  specs: Record<string, string>
}

const rearPanelSpecs: Record<string, PortSpec> = {
  'ac-inlet': {
    id: 'ac-inlet',
    label: 'AC Power Inlet',
    category: 'Power',
    indicatorColor: '#ffffff',
    description:
      'IEC 60320 C14 male inlet providing mains AC power to the internal switching power supply. Auto-ranging — no manual voltage selection required.',
    specs: {
      Standard: 'IEC 60320 C14',
      'Input Voltage': '100–240V AC auto-range',
      Frequency: '50/60 Hz',
      'Max Current': '2A @ 240V / 4A @ 100V',
      'Connector Type': '3-pin (L, N, PE)',
      Grounding: 'Chassis earth bonded',
    },
  },
  'rocker-switch': {
    id: 'rocker-switch',
    label: 'I/O Power Rocker Switch',
    category: 'Power',
    indicatorColor: '#ffffff',
    description:
      'Single-pole single-throw (SPST) rocker switch interrupting the live AC feed to the internal PSU. Press "I" (top) to power on, "O" (bottom) to power off.',
    specs: {
      Type: 'SPST rocker (illuminated)',
      Rating: '10A @ 125V / 6A @ 250V',
      Positions: 'ON (I) / OFF (O)',
      Illumination: 'Neon indicator (red when ON)',
      Ingress: 'IP40',
    },
  },
  console: {
    id: 'console',
    label: 'CONSOLE Port (RJ-45)',
    category: 'Management',
    indicatorColor: '#00ccbb',
    description:
      'EIA/TIA-232 asynchronous serial management port. Used for direct CLI access via a rollover cable (Cisco console cable, 72-3383-01) to a PC COM port or terminal server.',
    specs: {
      Connector: 'RJ-45 (8P8C)',
      Standard: 'EIA/TIA-232 (RS-232)',
      'Baud Rate': '9600 baud (default)',
      'Data Bits': '8',
      Parity: 'None',
      'Stop Bits': '1',
      'Flow Control': 'None',
      'Max Cable': '15m (50ft)',
      'IOS Access': 'enable / rommon / password recovery',
    },
  },
  aux: {
    id: 'aux',
    label: 'AUX Port (RJ-45)',
    category: 'Management',
    indicatorColor: '#ff8800',
    description:
      'Auxiliary asynchronous serial port — primarily used for out-of-band management via an attached analog modem. Supports hardware flow control (RTS/CTS) unlike the CONSOLE port.',
    specs: {
      Connector: 'RJ-45 (8P8C)',
      Standard: 'EIA/TIA-232 (RS-232)',
      'Max Baud': '115,200 bps',
      'Flow Control': 'RTS/CTS hardware',
      'Modem Support': 'AT command set',
      'Data Bits': '8',
      Parity: 'None',
      'IOS Config': 'line aux 0',
    },
  },
  'ethernet-0': {
    id: 'ethernet-0',
    label: 'ETHERNET 0/0 (RJ-45)',
    category: 'LAN',
    indicatorColor: '#ddcc00',
    description:
      'Cisco 2600 onboard 10BASE-T Ethernet LAN port. Connected directly to the internal LANCE (Am79C965A) Ethernet controller on the system PCB.',
    specs: {
      Connector: 'RJ-45 (8P8C)',
      Standard: 'IEEE 802.3 10BASE-T',
      Speed: '10 Mbps (half/full duplex)',
      'MAC Address': 'Burned into NVRAM',
      Controller: 'AMD Am79C965A LANCE',
      'IOS Interface': 'FastEthernet0/0',
      'LED (LNK)': 'Green — link established',
      'LED (ACT)': 'Amber — transmit/receive',
    },
  },
  'wic-db60': {
    id: 'wic-db60',
    label: 'WIC-1T Serial — DB-60 Port',
    category: 'WAN',
    indicatorColor: '#4488ff',
    description:
      'HD-60 (DB-60) synchronous serial port on a WIC-1T (1-port serial WAN Interface Card). Supports multiple encapsulations: HDLC, PPP, Frame Relay, X.25, SMDS.',
    specs: {
      Connector: 'HD-60 (Cisco proprietary D-sub)',
      'Physical Layer': 'EIA/TIA-232, V.35, X.21, EIA-449, EIA-530',
      'Max Speed': '8 Mbps (synchronous)',
      Encapsulation: 'HDLC / PPP / Frame Relay / X.25',
      'Clocking': 'DTE or DCE selectable',
      'IOS Interface': 'Serial0/0',
      'LED (TX)': 'Green — transmitting',
      'LED (RX)': 'Amber — receiving',
      'Module Part': 'WIC-1T (Cisco)',
    },
  },
  'nm-blank': {
    id: 'nm-blank',
    label: 'NM Slot — Blank Cover',
    category: 'Expansion',
    indicatorColor: '#666677',
    description:
      'Empty Network Module slot fitted with a ventilated blank cover plate. This slot accepts full-size NM cards (NM-1E, NM-4E, NM-1FE-TX, NM-1A-T3, NM-HDV etc.) for LAN, WAN or voice expansion.',
    specs: {
      'Slot Type': 'Network Module (NM)',
      Status: 'Empty — blank cover installed',
      'Compatible Modules': 'NM-1E, NM-4E, NM-1FE-TX, NM-16ESW, NM-HDV',
      'Bus Interface': 'Cisco IQ High-Speed Bus',
      'Max Throughput': 'Up to 100 Mbps (NM-dependent)',
      'Fastening': 'Two captive thumbscrews',
      'Cover Type': 'Ventilated sheet metal',
    },
  },
}

export default rearPanelSpecs
