import { type SpecField, type SpecGroup } from './componentSpecs'

export interface PortSpec {
  id: string
  label: string
  category: string
  indicatorColor: string
  description: string
  specGroups: SpecGroup[]
}

export { type SpecField, type SpecGroup }

const rearPanelSpecs: Record<string, PortSpec> = {
  'ac-inlet': {
    id: 'ac-inlet',
    label: 'AC Quvvat Kiritish (IEC C14)',
    category: 'Quvvat',
    indicatorColor: '#ffffff',
    description:
      "IEC 60320 C14 erkak ulagichi ichki kommutatsion quvvat blokiga asosiy AC quvvatini uzatadi. Avtomatik kuchlanma diapazoni — qo'lda sozlash talab qilinmaydi.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Ulagich Turi', value: 'IEC 60320 C14', bold: true },
          { key: 'Pin Soni', value: '3 pinli (L, N, PE)' },
          { key: 'Yerga Ulash', value: "Korpus bilan bog'langan" },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Kirish Kuchlanmasi', value: '100-240V AC (avtomatik)', bold: true },
          { key: 'Chastota', value: '50/60 Hz' },
          { key: 'Maksimal Tok', value: '2A @ 240V / 4A @ 100V', bold: true },
          { key: 'Standart', value: 'IEC 60320' },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'Kabel Turi', value: 'IEC C13 → C14 quvvat kabeli' },
          { key: "Qo'lda Sozlash", value: "Talab qilinmaydi" },
        ],
      },
    ],
  },
  'rocker-switch': {
    id: 'rocker-switch',
    label: "I/O Quvvat Tugmasi",
    category: 'Quvvat',
    indicatorColor: '#ffffff',
    description:
      'Ichki quvvat blokiga AC oqimini uzuvchi bir qutbli bir holatli (SPST) roker tugmasi.',
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Tur', value: 'SPST roker (yoritilgan)', bold: true },
          { key: 'Himoya Darajasi', value: 'IP40' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: "Nom Quvvati", value: '10A @ 125V / 6A @ 250V', bold: true },
          { key: 'Holatlar', value: "YOQIQ (I) / O'CHIQ (O)", bold: true },
          { key: 'Yoritish', value: "Neon ko'rsatkich (yonganida qizil)" },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'Yoqish', value: '"I" (yuqori) tarafini bosing' },
          { key: "O'chirish", value: '"O" (pastki) tarafini bosing' },
        ],
      },
    ],
  },
  console: {
    id: 'console',
    label: 'KONSOL Porti (RJ-45)',
    category: 'Boshqaruv',
    indicatorColor: '#00ccbb',
    description:
      "EIA/TIA-232 asinxron seriyali boshqaruv porti. Rollover kabel orqali to'g'ridan-to'g'ri CLI kirishini ta'minlaydi.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Ulagich', value: 'RJ-45 (8P8C)', bold: true },
          { key: 'Maksimal Kabel', value: '15m (50ft)' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Standart', value: 'EIA/TIA-232 (RS-232)', bold: true },
          { key: 'Baud Tezligi', value: '9600 baud (standart)', bold: true },
          { key: "Ma'lumot Bitlari", value: '8' },
          { key: 'Paritet', value: "Yo'q" },
          { key: "To'xtatish Bitlari", value: '1' },
          { key: "Oqim Nazorati", value: "Yo'q" },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'IOS Kirishi', value: 'enable / rommon / parol tiklash', bold: true },
          { key: 'Kabel', value: 'Rollover (Cisco 72-3383-01)' },
          { key: 'Terminal', value: 'PuTTY / HyperTerminal / minicom' },
        ],
      },
    ],
  },
  aux: {
    id: 'aux',
    label: 'AUX Porti (RJ-45)',
    category: 'Boshqaruv',
    indicatorColor: '#ff8800',
    description:
      "Yordamchi asinxron seriyali port — asosan ulangan analog modem orqali tashqi boshqaruv uchun ishlatiladi.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Ulagich', value: 'RJ-45 (8P8C)', bold: true },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Standart', value: 'EIA/TIA-232 (RS-232)', bold: true },
          { key: 'Maksimal Baud', value: '115,200 bps', bold: true },
          { key: "Oqim Nazorati", value: 'RTS/CTS apparat', bold: true },
          { key: "Ma'lumot Bitlari", value: '8' },
          { key: 'Paritet', value: "Yo'q" },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'IOS Konfiguratsiyasi', value: 'line aux 0', bold: true },
          { key: "Modem Qo'llab-quvvatlash", value: "AT buyruqlar to'plami" },
          { key: 'Asosiy Maqsad', value: 'Tashqi modem orqali boshqaruv' },
        ],
      },
    ],
  },
  'ethernet-0': {
    id: 'ethernet-0',
    label: 'ETHERNET 0/0 (RJ-45)',
    category: 'LAN',
    indicatorColor: '#ddcc00',
    description:
      "Cisco 2600 o'rnatilgan 10BASE-T Ethernet LAN porti. Tizim PCB dagi ichki LANCE kontrolleriga to'g'ridan-to'g'ri ulangan.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Ulagich', value: 'RJ-45 (8P8C)', bold: true },
          { key: 'Kontroller', value: 'AMD Am79C965A LANCE' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Standart', value: 'IEEE 802.3 10BASE-T', bold: true },
          { key: 'Tezlik', value: "10 Mbps (yarim/to'liq dupleks)", bold: true },
          { key: 'MAC Manzil', value: 'NVRAM ga yozilgan' },
          { key: 'LED (LNK)', value: "Yashil — aloqa o'rnatildi" },
          { key: 'LED (ACT)', value: "Sariq — uzatish/qabul qilish" },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'IOS Interfeysi', value: 'FastEthernet0/0', bold: true },
          { key: 'Konfiguratsiya', value: 'interface FastEthernet0/0' },
        ],
      },
    ],
  },
  'wic-db60': {
    id: 'wic-db60',
    label: 'WIC-1T Seriyali — DB-60 Porti',
    category: 'WAN',
    indicatorColor: '#4488ff',
    description:
      "WIC-1T dagi HD-60 sinxron seriyali port. HDLC, PPP, Frame Relay, X.25, SMDS inkapsulyatsiyalarini qo'llab-quvvatlaydi.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Ulagich', value: 'HD-60 (Cisco maxsus D-sub)', bold: true },
          { key: 'Modul Raqami', value: 'WIC-1T (Cisco)' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Fizik Qatlam', value: 'EIA/TIA-232, V.35, X.21, EIA-449', bold: true },
          { key: 'Maksimal Tezlik', value: '8 Mbps (sinxron)', bold: true },
          { key: "Soat Signali", value: 'DTE yoki DCE tanlanadi' },
          { key: 'LED (TX)', value: "Yashil — uzatish" },
          { key: 'LED (RX)', value: "Sariq — qabul qilish" },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'IOS Interfeysi', value: 'Serial0/0', bold: true },
          { key: 'Inkapsulyatsiya', value: 'HDLC / PPP / Frame Relay / X.25', bold: true },
          { key: 'DTE/DCE', value: 'show controllers serial0/0' },
        ],
      },
    ],
  },
  'nm-blank': {
    id: 'nm-blank',
    label: "NM Uyasi — Bo'sh Qopqoq",
    category: 'Kengaytirish',
    indicatorColor: '#666677',
    description:
      "Ventilyatsiyali bo'sh qopqoq bilan jihozlangan bo'sh tarmoq moduli uyasi. LAN, WAN yoki ovoz kengaytirishi uchun to'liq o'lchamli NM kartalar o'rnatilishi mumkin.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Uyasi Turi', value: 'Tarmoq Moduli (NM)', bold: true },
          { key: 'Mahkamlash', value: "Ikki qo'l vinti" },
          { key: 'Qopqoq Turi', value: "Ventilyatsiyali po'lat qopqoq" },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Avtobus Interfeysi', value: 'Cisco IQ Yuqori Tezlikli Avtobus', bold: true },
          { key: "Maksimal O'tkazuvchanlik", value: "100 Mbps (modulga bog'liq)" },
          { key: 'Holat', value: "Bo'sh — qopqoq o'rnatilgan" },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'Mos Modullar', value: 'NM-1E, NM-4E, NM-1FE-TX, NM-16ESW', bold: true },
          { key: "Issiq Almashtirish", value: "Yo'q — qayta yuklash kerak" },
        ],
      },
    ],
  },
}

export default rearPanelSpecs
