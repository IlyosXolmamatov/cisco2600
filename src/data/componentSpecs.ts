export interface SpecField {
  key: string
  value: string
  bold?: boolean
}

export interface SpecGroup {
  category: 'JISMONIY' | 'TEXNIK' | 'FOYDALANISH'
  fields: SpecField[]
}

export interface ComponentSpec {
  label: string
  description: string
  specGroups: SpecGroup[]
}

const specs: Record<string, ComponentSpec> = {
  'top-cover': {
    label: 'Yuqori Qopqoq',
    description: "Ichki qismlarni EMI ta'siridan himoyalaydigan va mexanik shikastlanishdan saqlovchi shtampli po'lat korpus qopqog'i.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Material', value: "Sovuq preslangan po'lat (1mm)", bold: true },
          { key: 'Qoplama', value: "Sink fosfat + kukun bo'yoq" },
          { key: "O'lchamlar", value: '445mm × 301mm', bold: true },
          { key: 'Vazn', value: '~320g' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Shamollatish', value: '8 × shtampli louver' },
          { key: 'EMI Himoya', value: 'To\'liq metallashtirilgan' },
        ],
      },
    ],
  },
  'base-frame': {
    label: 'Asosiy Rama / Korpus',
    description: "Cisco 2600 seriyasining tarkibiy skeletini tashkil etuvchi mustahkam po'lat asosi va yon panellari.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Material', value: "Qalin po'lat", bold: true },
          { key: 'Kenglik', value: '444.5 mm (17.5")', bold: true },
          { key: 'Balandlik', value: '43.2 mm (1.7")', bold: true },
          { key: 'Chuqurlik', value: '301 mm (11.85")' },
          { key: 'Vazn', value: '~2.3 kg (bo\'sh)' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Stend Birliklari', value: '1U', bold: true },
          { key: "O'rnatish Turi", value: 'EIA-310-D standart stend' },
        ],
      },
    ],
  },
  pcb: {
    label: 'Asosiy Plata / Tizim PCB',
    description: "Protsessor, xotira interfeyslari, WIC uyalari, NM uyasi va Cisco 2600 platformasining barcha avtobus mantig'ini o'z ichiga olgan asosiy tizim platasi.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'PCB Qatlamlari', value: '6 qatlamli FR4', bold: true },
          { key: "O'lchamlar", value: '~400mm × 260mm' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Avtobus Kengligi', value: '32-bit', bold: true },
          { key: 'Tizim Avtobusi', value: 'Cisco IQ Bus', bold: true },
          { key: 'WIC Uyalari', value: '2 × WAN Interfeys Kartasi' },
          { key: 'NM Uyalari', value: '1 × Tarmoq Moduli' },
          { key: 'Flash Xotira', value: '8-32 MB (SIMM)' },
          { key: "DRAM Qo'llab-quvvatlash", value: '64 MB gacha' },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'IOS Versiyasi', value: '12.x va undan yuqori' },
          { key: 'Kengaytirish', value: 'WIC + NM orqali' },
        ],
      },
    ],
  },
  cpu: {
    label: 'Protsessor — Motorola MPC860',
    description: "Cisco 2600ning asosiy qismi — integratsiyalangan kommunikatsiya kontrolleri bilan ta'minlangan, tarmoqlash uchun optimallashtirilgan PowerPC asosidagi protsessor.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Korpus', value: 'BGA-357', bold: true },
          { key: 'Ishlab Chiqaruvchi', value: 'Motorola / Freescale' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Arxitektura', value: 'PowerPC (MPC860)', bold: true },
          { key: 'Tezlik', value: '50-80 MHz', bold: true },
          { key: 'Kesh (L1)', value: '4 KB I-Kesh / 4 KB D-Kesh' },
          { key: 'Avtobus Tezligi', value: '50 MHz' },
          { key: "Buyruqlar To'plami", value: 'PowerPC 32-bit RISC', bold: true },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'Optimallashtirish', value: 'Tarmoq paketlarini qayta ishlash' },
          { key: 'CPU Yuklanish', value: 'show processes cpu buyrug\'i' },
        ],
      },
    ],
  },
  'boot-rom': {
    label: 'Yuklash ROM / NVRAM',
    description: "Cisco bootstrap dasturiy ta'minotini (ROMmon) va ishga tushirish konfiguratsiyasini saqlash uchun NVRAM o'z ichiga olgan o'zgarmas ROM.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Korpus', value: 'PLCC-32', bold: true },
          { key: 'Kuchlanma', value: '5V / 3.3V' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Tur', value: 'PLCC Flash ROM', bold: true },
          { key: "Sig'im", value: '2 MB (ROM) + 32KB NVRAM', bold: true },
          { key: 'Interfeys', value: 'Parallel flash' },
          { key: 'Kirish Vaqti', value: '70 ns' },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'Yuklash Dasturi', value: 'Cisco ROMmon', bold: true },
          { key: 'Parol Tiklash', value: 'confreg 0x2142' },
          { key: 'NVRAM Maqsadi', value: 'startup-config saqlash' },
        ],
      },
    ],
  },
  'ram-0': {
    label: 'DRAM DIMM Uyasi 0',
    description: "Asosiy DRAM uyasi. Cisco 2600 Cisco IOS tomonidan foydalanadigan asosiy tizim xotirasi uchun maxsus DRAM DIMM lardan foydalanadi.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Tur', value: 'DRAM DIMM (maxsus)', bold: true },
          { key: 'Kuchlanma', value: '3.3V' },
          { key: 'Avtobus Kengligi', value: '64-bit' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Tezlik', value: 'PC66 / 66 MHz', bold: true },
          { key: 'Standart Hajm', value: '32 MB' },
          { key: 'Uyaga Maksimal', value: '32 MB' },
          { key: 'Jami Maksimal', value: '64 MB (2 uyasi)', bold: true },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'Tekshirish', value: 'show version | inc DRAM' },
          { key: 'Minimal IOS', value: '32 MB tavsiya etiladi' },
        ],
      },
    ],
  },
  'ram-1': {
    label: 'DRAM DIMM Uyasi 1',
    description: "Ikkilamchi DRAM kengaytirish uyasi. Ikkinchi DIMM qo'shish kattaroq IOS xususiyatlari to'plamini ishlatish uchun tizim xotirasini ikki baravar oshiradi.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Tur', value: 'DRAM DIMM (maxsus)', bold: true },
          { key: 'Kuchlanma', value: '3.3V' },
          { key: 'Avtobus Kengligi', value: '64-bit' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Tezlik', value: 'PC66 / 66 MHz', bold: true },
          { key: 'Standart Hajm', value: "Bo'sh (ixtiyoriy)" },
          { key: 'Uyaga Maksimal', value: '32 MB' },
          { key: 'Jami Maksimal', value: '64 MB (2 uyasi)', bold: true },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: "O'rnatish Maqsadi", value: 'Kattaroq IOS image uchun' },
          { key: "Issiq Almashtirish", value: "Yo'q — qayta yuklash kerak" },
        ],
      },
    ],
  },
  'wic-0': {
    label: 'WIC Uyasi 0 — WAN Interfeys Kartasi',
    description: "WAN interfeys kartasi seriyali, ISDN BRI, DSL yoki T1/E1 WAN ulanishini ta'minlaydi.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Karta Turi', value: 'WIC-1T / WIC-2T / WIC-1DSU-T1', bold: true },
          { key: 'Konnektyor Turi', value: 'Smart Serial yoki RJ-48', bold: true },
          { key: 'Quvvat', value: '3.3V tizimdan' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Interfeys', value: 'Seriyali (DB-60 / Smart Serial)' },
          { key: 'Maksimal Tezlik', value: '8 Mbps gacha (seriyali)', bold: true },
          { key: 'Avtobus', value: 'WIC Avtobusi (maxsus)' },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'IOS Interfeysi', value: 'Serial0/0', bold: true },
          { key: "Issiq Almashtirish", value: "Yo'q" },
          { key: 'Inkapsulyatsiya', value: 'HDLC / PPP / Frame Relay' },
        ],
      },
    ],
  },
  'wic-1': {
    label: 'WIC Uyasi 1 — WAN Interfeys Kartasi',
    description: "Zahira yoki qo'shimcha WAN liniyalari uchun ikkinchi WAN interfeys karta uyasi.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Karta Turi', value: 'WIC-1T / WIC-2T / WIC-1DSU-T1', bold: true },
          { key: 'Konnektyor Turi', value: 'Smart Serial yoki RJ-48', bold: true },
          { key: 'Quvvat', value: '3.3V tizimdan' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Interfeys', value: 'Seriyali / ISDN BRI' },
          { key: 'Maksimal Tezlik', value: '8 Mbps gacha (seriyali)', bold: true },
          { key: 'Avtobus', value: 'WIC Avtobusi (maxsus)' },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'IOS Interfeysi', value: 'Serial0/1', bold: true },
          { key: "Issiq Almashtirish", value: "Yo'q" },
          { key: 'Maqsad', value: 'Zahira WAN / ikkinchi liniya' },
        ],
      },
    ],
  },
  'nm-module': {
    label: 'Tarmoq Moduli (NM) Uyasi',
    description: "Ethernet, Token Ring, ATM, ovoz yoki VPN tezlashtirish modullarini qo'llab-quvvatlovchi yuqori o'tkazuvchanlikli NM uyasi.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Modul Turi', value: 'NM-1E / NM-4E / NM-1FE-TX', bold: true },
          { key: 'Quvvat', value: '5V / 3.3V' },
          { key: 'Uyasi', value: '1 × NM uyasi' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Avtobus', value: 'Cisco IQ Yuqori Tezlikli Avtobus', bold: true },
          { key: "Maksimal O'tkazuvchanlik", value: '100 Mbps', bold: true },
          { key: 'Interfeys', value: "10/100 Ethernet (modulga bog'liq)" },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: "Issiq Almashtirish", value: "Yo'q" },
          { key: 'Kengaytirish Imkoniyati', value: 'LAN / WAN / Ovoz / VPN' },
        ],
      },
    ],
  },
  psu: {
    label: 'Ichki Quvvat Bloki',
    description: "Barcha tizim qismlariga tartibga solingan DC kuchlanmalarni ta'minlovchi integratsiyalangan kommutatsion quvvat bloki.",
    specGroups: [
      {
        category: 'JISMONIY',
        fields: [
          { key: 'Forma-faktor', value: "Integratsiyalangan (olib bo'lmaydi)", bold: true },
          { key: 'Tur', value: 'Kommutatsion QB' },
        ],
      },
      {
        category: 'TEXNIK',
        fields: [
          { key: 'Kirish Kuchlanmasi', value: '100-240V AC, 50/60Hz', bold: true },
          { key: '+5V Chiqish', value: '5A', bold: true },
          { key: '+3.3V Chiqish', value: '6A' },
          { key: '+12V Chiqish', value: '1A' },
          { key: 'Umumiy Quvvat', value: '~40W maksimal', bold: true },
        ],
      },
      {
        category: 'FOYDALANISH',
        fields: [
          { key: 'Avtomatik Kuchlanma', value: "Ha — 100V dan 240V gacha" },
          { key: 'Sovutish', value: 'Ichki ventilyator bilan' },
        ],
      },
    ],
  },
}

export default specs
