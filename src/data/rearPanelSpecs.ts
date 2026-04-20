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
    label: 'AC Quvvat Kiritish (IEC C14)',
    category: 'Quvvat',
    indicatorColor: '#ffffff',
    description:
      "IEC 60320 C14 erkak ulagichi ichki kommutatsion quvvat blokiga asosiy AC quvvatini uzatadi. Avtomatik kuchlanma diapazoni — qo'lda sozlash talab qilinmaydi.",
    specs: {
      Standart: 'IEC 60320 C14',
      'Kirish Kuchlanmasi': '100-240V AC (avtomatik)',
      Chastota: '50/60 Hz',
      'Maksimal Tok': '2A @ 240V / 4A @ 100V',
      'Ulagich Turi': '3 pinli (L, N, PE)',
      Yerga_Ulash: "Korpus bilan bog'langan",
    },
  },
  'rocker-switch': {
    id: 'rocker-switch',
    label: "I/O Quvvat Tugmasi",
    category: 'Quvvat',
    indicatorColor: '#ffffff',
    description:
      'Ichki quvvat blokiga AC oqimini uzuvchi bir qutbli bir holatli (SPST) roker tugmasi. Yoqish uchun "I" (yuqori), o\'chirish uchun "O" (pastki) tarafini bosing.',
    specs: {
      Tur: 'SPST roker (yoritilgan)',
      "Nom Quvvati": '10A @ 125V / 6A @ 250V',
      Holatlar: "YOQIQ (I) / O'CHIQ (O)",
      Yoritish: "Neon ko'rsatkich (yonganida qizil)",
      "Himoya Darajasi": 'IP40',
    },
  },
  console: {
    id: 'console',
    label: 'KONSOL Porti (RJ-45)',
    category: 'Boshqaruv',
    indicatorColor: '#00ccbb',
    description:
      "EIA/TIA-232 asinxron seriyali boshqaruv porti. Rollover kabel (Cisco konsol kabeli, 72-3383-01) orqali to'g'ridan-to'g'ri CLI kirishini ta'minlaydi.",
    specs: {
      Ulagich: 'RJ-45 (8P8C)',
      Standart: 'EIA/TIA-232 (RS-232)',
      'Baud Tezligi': '9600 baud (standart)',
      "Ma'lumot Bitlari": '8',
      Paritet: "Yo'q",
      "To'xtatish Bitlari": '1',
      "Oqim Nazorati": "Yo'q",
      'Maksimal Kabel': '15m (50ft)',
      'IOS Kirishi': 'enable / rommon / parol tiklash',
    },
  },
  aux: {
    id: 'aux',
    label: 'AUX Porti (RJ-45)',
    category: 'Boshqaruv',
    indicatorColor: '#ff8800',
    description:
      "Yordamchi asinxron seriyali port — asosan ulangan analog modem orqali tashqi boshqaruv uchun ishlatiladi. KONSOL portidan farqli ravishda apparat oqim nazoratini (RTS/CTS) qo'llab-quvvatlaydi.",
    specs: {
      Ulagich: 'RJ-45 (8P8C)',
      Standart: 'EIA/TIA-232 (RS-232)',
      'Maksimal Baud': '115,200 bps',
      "Oqim Nazorati": 'RTS/CTS apparat',
      'Modem Qo\'llab-quvvatlash': 'AT buyruqlar to\'plami',
      "Ma'lumot Bitlari": '8',
      Paritet: "Yo'q",
      'IOS Konfiguratsiyasi': 'line aux 0',
    },
  },
  'ethernet-0': {
    id: 'ethernet-0',
    label: 'ETHERNET 0/0 (RJ-45)',
    category: 'LAN',
    indicatorColor: '#ddcc00',
    description:
      "Cisco 2600 o'rnatilgan 10BASE-T Ethernet LAN porti. Tizim PCB dagi ichki LANCE (Am79C965A) Ethernet kontrolleriga to'g'ridan-to'g'ri ulangan.",
    specs: {
      Ulagich: 'RJ-45 (8P8C)',
      Standart: 'IEEE 802.3 10BASE-T',
      Tezlik: '10 Mbps (yarim/to\'liq dupleks)',
      'MAC Manzil': 'NVRAM ga yozilgan',
      Kontroller: 'AMD Am79C965A LANCE',
      'IOS Interfeysi': 'FastEthernet0/0',
      'LED (LNK)': "Yashil — aloqa o'rnatildi",
      'LED (ACT)': "Sariq — uzatish/qabul qilish",
    },
  },
  'wic-db60': {
    id: 'wic-db60',
    label: 'WIC-1T Seriyali — DB-60 Porti',
    category: 'WAN',
    indicatorColor: '#4488ff',
    description:
      "WIC-1T (1 portli seriyali WAN interfeys kartasi) dagi HD-60 (DB-60) sinxron seriyali port. Bir nechta inkapsulyatsiyani qo'llab-quvvatlaydi: HDLC, PPP, Frame Relay, X.25, SMDS.",
    specs: {
      Ulagich: 'HD-60 (Cisco maxsus D-sub)',
      'Fizik Qatlam': 'EIA/TIA-232, V.35, X.21, EIA-449, EIA-530',
      'Maksimal Tezlik': '8 Mbps (sinxron)',
      Inkapsulyatsiya: 'HDLC / PPP / Frame Relay / X.25',
      "Soat Signali": 'DTE yoki DCE tanlanadi',
      'IOS Interfeysi': 'Serial0/0',
      'LED (TX)': "Yashil — uzatish",
      'LED (RX)': "Sariq — qabul qilish",
      'Modul Raqami': 'WIC-1T (Cisco)',
    },
  },
  'nm-blank': {
    id: 'nm-blank',
    label: "NM Uyasi — Bo'sh Qopqoq",
    category: 'Kengaytirish',
    indicatorColor: '#666677',
    description:
      "Ventilyatsiyali bo'sh qopqoq bilan jihozlangan bo'sh tarmoq moduli uyasi. Bu uyaga LAN, WAN yoki ovoz kengaytirishi uchun to'liq o'lchamli NM kartalar o'rnatilishi mumkin.",
    specs: {
      'Uyasi Turi': 'Tarmoq Moduli (NM)',
      Holat: "Bo'sh — qopqoq o'rnatilgan",
      'Mos Modullar': 'NM-1E, NM-4E, NM-1FE-TX, NM-16ESW, NM-HDV',
      'Avtobus Interfeysi': 'Cisco IQ Yuqori Tezlikli Avtobus',
      "Maksimal O'tkazuvchanlik": '100 Mbps (modulga bog\'liq)',
      Mahkamlash: 'Ikki qo\'l vinti',
      'Qopqoq Turi': "Ventilyatsiyali po'lat qopqoq",
    },
  },
}

export default rearPanelSpecs
