export interface ComponentSpec {
  label: string
  specs: Record<string, string>
  description: string
}

const specs: Record<string, ComponentSpec> = {
  'top-cover': {
    label: 'Yuqori Qopqoq',
    description: "Ichki qismlarni EMI ta'siridan himoyalaydigan va mexanik shikastlanishdan saqlovchi shtampli po'lat korpus qopqog'i.",
    specs: {
      Material: "Sovuq preslangan po'lat (1mm)",
      Qoplama: "Sink fosfat + kukun bo'yoq",
      "O'lchamlar": '445mm × 301mm',
      Vazn: '~320g',
      'Shamollatish Teshiklari': '8 × shtampli louver',
    },
  },
  'base-frame': {
    label: 'Asosiy Rama / Korpus',
    description: "Cisco 2600 seriyasining tarkibiy skeletini tashkil etuvchi mustahkam po'lat asosi va yon panellari.",
    specs: {
      Material: "Qalin po'lat",
      Kenglik: '444.5 mm (17.5")',
      Balandlik: '43.2 mm (1.7")',
      Chuqurlik: '301 mm (11.85")',
      'Stend Birliklari': '1U',
      "O'rnatish Turi": 'EIA-310-D standart stend',
    },
  },
  pcb: {
    label: 'Asosiy Plata / Tizim PCB',
    description: "Protsessor, xotira interfeyslari, WIC uyalari, NM uyasi va Cisco 2600 platformasining barcha avtobus mantig'ini o'z ichiga olgan asosiy tizim platasi.",
    specs: {
      'PCB Qatlamlari': '6 qatlamli FR4',
      'Avtobus Kengligi': '32-bit',
      'Tizim Avtobusi': 'Cisco IQ Bus',
      'WIC Uyalari': '2 × WAN Interfeys Kartasi',
      'NM Uyalari': '1 × Tarmoq Moduli',
      'Flash Xotira': '8-32 MB (SIMM)',
      "DRAM Qo'llab-quvvatlash": '64 MB gacha',
    },
  },
  cpu: {
    label: 'Protsessor — Motorola MPC860',
    description: "Cisco 2600ning asosiy qismi — integratsiyalangan kommunikatsiya kontrolleri bilan ta'minlangan, tarmoqlash uchun optimallashtirilgan PowerPC asosidagi protsessor.",
    specs: {
      Arxitektura: 'PowerPC (MPC860)',
      Tezlik: '50-80 MHz',
      'Kesh (L1)': '4 KB I-Kesh / 4 KB D-Kesh',
      Korpus: 'BGA-357',
      'Avtobus Tezligi': '50 MHz',
      "Buyruqlar To'plami": 'PowerPC 32-bit RISC',
      'Ishlab Chiqaruvchi': 'Motorola / Freescale',
    },
  },
  'boot-rom': {
    label: 'Yuklash ROM / NVRAM',
    description: "Cisco bootstrap dasturiy ta'minotini (ROMmon) va ishga tushirish konfiguratsiyasini saqlash uchun NVRAM o'z ichiga olgan o'zgarmas ROM.",
    specs: {
      Tur: 'PLCC Flash ROM',
      "Sig'im": '2 MB (ROM) + 32KB NVRAM',
      'Yuklash Dasturi': 'Cisco ROMmon',
      Interfeys: 'Parallel flash',
      'Kirish Vaqti': '70 ns',
      Kuchlanma: '5V / 3.3V',
      Korpus: 'PLCC-32',
    },
  },
  'ram-0': {
    label: 'DRAM DIMM Uyasi 0',
    description: "Asosiy DRAM uyasi. Cisco 2600 Cisco IOS tomonidan foydalanadigan asosiy tizim xotirasi uchun maxsus DRAM DIMM lardan foydalanadi.",
    specs: {
      Tur: 'DRAM DIMM (maxsus)',
      'Standart Hajm': '32 MB',
      'Uyaga Maksimal': '32 MB',
      'Jami Maksimal': '64 MB (2 uyasi)',
      'Avtobus Kengligi': '64-bit',
      Tezlik: 'PC66 / 66 MHz',
      Kuchlanma: '3.3V',
    },
  },
  'ram-1': {
    label: 'DRAM DIMM Uyasi 1',
    description: "Ikkilamchi DRAM kengaytirish uyasi. Ikkinchi DIMM qo'shish kattaroq IOS xususiyatlari to'plamini ishlatish uchun tizim xotirasini ikki baravar oshiradi.",
    specs: {
      Tur: 'DRAM DIMM (maxsus)',
      'Standart Hajm': "Bo'sh (ixtiyoriy)",
      'Uyaga Maksimal': '32 MB',
      'Jami Maksimal': '64 MB (2 uyasi)',
      'Avtobus Kengligi': '64-bit',
      Tezlik: 'PC66 / 66 MHz',
      Kuchlanma: '3.3V',
    },
  },
  'wic-0': {
    label: 'WIC Uyasi 0 — WAN Interfeys Kartasi',
    description: "WAN interfeys kartasi seriyali, ISDN BRI, DSL yoki T1/E1 WAN ulanishini ta'minlaydi. Ba'zi variantlarda issiq almashtirish imkoniyati mavjud.",
    specs: {
      'Karta Turi': 'WIC-1T / WIC-2T / WIC-1DSU-T1',
      Interfeys: 'Seriyali (DB-60 / Smart Serial)',
      'Maksimal Tezlik': '8 Mbps gacha (seriyali)',
      Avtobus: 'WIC Avtobusi (maxsus)',
      'Konnektyor Turi': 'Smart Serial yoki RJ-48',
      Quvvat: '3.3V tizimdan',
      'Issiq Almashtirish': "Yo'q",
    },
  },
  'wic-1': {
    label: 'WIC Uyasi 1 — WAN Interfeys Kartasi',
    description: "Zahira yoki qo'shimcha WAN liniyalari uchun ikkinchi WAN interfeys karta uyasi. 0-uyasi bilan bir xil WIC turlarini qo'llab-quvvatlaydi.",
    specs: {
      'Karta Turi': 'WIC-1T / WIC-2T / WIC-1DSU-T1',
      Interfeys: 'Seriyali / ISDN BRI',
      'Maksimal Tezlik': '8 Mbps gacha (seriyali)',
      Avtobus: 'WIC Avtobusi (maxsus)',
      'Konnektyor Turi': 'Smart Serial yoki RJ-48',
      Quvvat: '3.3V tizimdan',
      'Issiq Almashtirish': "Yo'q",
    },
  },
  'nm-module': {
    label: 'Tarmoq Moduli (NM) Uyasi',
    description: "Ethernet, Token Ring, ATM, ovoz yoki VPN tezlashtirish modullarini qo'llab-quvvatlovchi yuqori o'tkazuvchanlikli NM uyasi.",
    specs: {
      'Modul Turi': 'NM-1E / NM-4E / NM-1FE-TX',
      Interfeys: "10/100 Ethernet (modulga bog'liq)",
      Avtobus: 'Cisco IQ Yuqori Tezlikli Avtobus',
      "Maksimal O'tkazuvchanlik": '100 Mbps',
      Uyasi: '1 × NM uyasi',
      Quvvat: '5V / 3.3V',
      'Issiq Almashtirish': "Yo'q",
    },
  },
  psu: {
    label: 'Ichki Quvvat Bloki',
    description: "Barcha tizim qismlariga tartibga solingan DC kuchlanmalarni ta'minlovchi integratsiyalangan kommutatsion quvvat bloki. Cisco 2600 o'rnatilgan quvvat blokidan foydalanadi.",
    specs: {
      Tur: 'Integratsiyalangan kommutatsion QB',
      'Kirish Kuchlanmasi': '100-240V AC, 50/60Hz',
      '+5V Chiqish': '5A',
      '+3.3V Chiqish': '6A',
      '+12V Chiqish': '1A',
      'Umumiy Quvvat': '~40W maksimal',
      'Forma-faktor': "Integratsiyalangan (olib bo'lmaydi)",
    },
  },
}

export default specs
