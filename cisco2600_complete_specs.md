# Cisco 2600 Series Router - Ichki Komponentlar Tafsiloti
## Professional 3D Modeling va Assembly Reference

---

## 📊 UMUMIY CHASSIS PARAMETRLARI

### Tashqi O'lchamlar
- **Uzunligi (Length):** 440 mm
- **Eni (Width):** 110 mm
- **Balandligi (Height):** 70 mm (horzatilgan holat)
- **Og'irligi:** ~2.8 kg

### Ichki Hajmi
- **Samarali hajm:** 3.4 litr (PCB va komponentlar uchun)
- **Ventilasyon bo'shliqlari:** 4 ta lateral airflow channel

### Material va Rang
- **Korpus:** Aluminum alloy (A6063-T5) + steel reinforcement
- **Tashqi Rang:** Midnight Blue (#1a3a4a) - matte finish
- **Ichki Rang:** Light Gray (#d0d0d0) - powder coated
- **EMI Shielding:** Copper-nickel mesh (faraday cage principle)

---

## 🔧 KOMPONENTLAR KATALOGI

### 1️⃣ ASOSIY PLATA / SYSTEM PCB (MOTHERBOARD)
**Funksiyasi:** Tizim boshqaruvchisi, barcha modullarni birixtiruvchi

#### Fizik Xususiyatlari
| Parametr | Qiymati |
|----------|---------|
| **Shakli** | Düzburchak (rectangular) |
| **Uzunligi** | 380 mm |
| **Eni** | 85 mm |
| **Qalinligi** | 2.0 mm (FR-4 multilayer) |
| **Qatlamlar soni** | 6-layer PCB |
| **Joylashtirilishi** | Chassisning markaziy qismi, -5° qiyashda |

#### PCB Sirtining Xususiyatlari
- **Asosiy Rang:** Qora (#0a0a0a) - FR-4 fiber weave
- **Copper Traces:** Zimmet-colored (#c9932e), 0.3-0.5 mm kenglik
- **Via-lar:** 0.3 mm diameter, 1.2 mm spacing
- **Gold Plating:** Kontakt chigida #d4af37, 0.05 mm qalinligi
- **Silk-screen:** Oq text (#ffffff), 2pt sans-serif
- **Roughness (PBR):** 0.65
- **Normal Map:** FR-4 woven texture

#### Montaj Noktalariga Qadar Masofa
- **Ön taraf (Front edge):** +45 mm X-axis dan
- **Orqa taraf (Rear edge):** -335 mm X-axis dan
- **Chap taraf (Left edge):** -42.5 mm Y-axis dan
- **O'ng taraf (Right edge):** +42.5 mm Y-axis dan
- **Balandligi (Height):** +15 mm Z-axis dan (chassis quyi sirtidan)

---

### 2️⃣ PROCESSOR / CPU (MIPS R4700 yoki IBM PowerPC)

#### Fizik Xususiyatlari
| Parametr | Qiymati |
|----------|---------|
| **Turi** | Motorola MPC860P yoki Mips R4700 |
| **Paket Turi** | PQFP-240 (Plastic Quad Flat Pack) |
| **O'lchamlari** | 28 × 28 × 4 mm |
| **Pin Soni** | 240 pins, 0.5 mm pitch |
| **Taktik Chastotasi** | 40 MHz - 100 MHz |
| **Issiqlik Dissipassiyasi** | ~5-8W |

#### Joylashtirilishi va Koordinatalari
- **X-axis:** -60 mm (PCB markazidan)
- **Y-axis:** -20 mm (PCB markazidan)
- **Z-axis:** +2.0 mm (PCB sirtidan)
- **Rotatsiya:** 0°

#### Material va Rang
- **Epoxy Resin Case:** Qora (#0d0d0d), matt finish
- **Markalar (Silk-screen):** Oq text, 3pt
  - CPU Model nomeri
  - Versiya kodi
  - Lotiya/tarixi
- **Haloqalagich (Heat spreader):** Aluminum, silver (#c0c0c0)
  - O'lchamlari: 30 × 30 × 2 mm
  - Joylashtirilishi: CPU-ning ustida, 0.2 mm gap

#### Elektron Xususiyatlari
- **Elektrning renglanishi:** Qora (#000000) ceramic
- **Pin Material:** Gilded nickel (#d4af37)
- **Quvvat Pinlari:** +3.3V, +5V, GND (multiple)
- **Hisob-kitob Pini:** 240 ta pin, 120 input/output

---

### 3️⃣ BOOT ROM / FLASH MEMORY

#### Fizik Xususiyatlari
| Parametr | Qiymati |
|----------|---------|
| **Turi** | Flash EEPROM, 4 MB - 8 MB |
| **Paket Turi** | PLCC-32 (Plastic Leaded Chip Carrier) |
| **O'lchamlari** | 17.8 × 17.8 × 3.5 mm |
| **Pin Soni** | 32 pins, 2.54 mm pitch |
| **Qisqa Nomi (Label)** | "BOOT FLASH" yoki "SYSTEM FLASH" |

#### Joylashtirilishi
- **X-axis:** +40 mm (CPU-dan o'ng tomonda)
- **Y-axis:** -15 mm
- **Z-axis:** +2.0 mm
- **Rotatsiya:** 0°

#### Material va Rang
- **Keramika Case:** Qora (#0d0d0d)
- **Lead Frame:** Güldü-plated copper (#d4af37)
- **Silk-screen Text:** Oq (#ffffff)
  - Ishlab chiqaruvchi nomi (Intel, AMD, ST Microelectronics)
  - Xotira hajmi (4M, 8M)
  - Data code

#### PBR Material Xususiyatlari
- **Base Color:** #0d0d0d (qora keramika)
- **Roughness:** 0.4
- **Metallic:** 0.0 (non-metallic case)
- **Pin Finish Roughness:** 0.3 (polished)

---

### 4️⃣ DRAM DIMM UYALARI (2 ta)

#### 4a. DRAM DIMM Sloti 0 (DRAM-0)

**Fizik Xususiyatlari**
| Parametr | Qiymati |
|----------|---------|
| **Turi** | 168-pin DIMM socket (SDRAM) |
| **Modul Sig'imi** | 32 MB - 256 MB |
| **Modul O'lchamlari** | 133 × 33.5 × 30 mm |
| **Pin Soni** | 168 pins, 1.27 mm pitch |
| **Talab Qilingan Kuchlanma** | +3.3V, +5V (modul bilan) |

**Joylashtirilishi**
- **X-axis:** -120 mm (PCB markazidan)
- **Y-axis:** +15 mm
- **Z-axis:** +2.0 mm (PCB sirtidan, sokket asos)
- **Qiyasha:** 90° vertikal (tik turush)
- **O'rnatish Orientatsiyasi:** Socketi PCB-ga perpendikulyar

**Socket Material va Xususiyatlari**
- **Korpus:** Plastik (thermoplastic, UL94-V0)
- **Rang:** Qora (#1a1a1a)
- **Kontakt Pinlari:** Tin-plated copper (#d4c0a0)
- **Retentori (Clips):** 2 ta push-down lock mechanism
- **Locking Pin Pozitsiyasi:** Modul pastiga 1/3 va 2/3 nuqtalari

**Installed DIMM Module Xususiyatlari** (agar mavjud bo'lsa)
- **PCB Rang:** Qora (#0a0a0a)
- **Chiplar:** 8 ta Samsung/Hynix BGA packages
- **Chip Joylashtirilishi:** 2 qator × 4 ta, Y=2.5mm va 7.2mm
- **Heat Spreader:** Aluminum, 2.5 mm qalinligi
- **Connector:** DIMM 168-pin gold-plated

#### 4b. DRAM DIMM Uyasi 1 (DRAM-1)

**Fizik Xususiyatlari**
- **Turi:** O'xshash 168-pin DIMM socket
- **O'lchamlari:** Bir xil

**Joylashtirilishi**
- **X-axis:** +120 mm (markazidan)
- **Y-axis:** +15 mm (DRAM-0 bilan bir qatorda)
- **Z-axis:** +2.0 mm
- **Masofa (otinasida):** DRAM-0 dan 240 mm

**E'tiborli Nuqta:** Ikkala socket ham bir xil Y-axis va Z-axis da, lekin X-axis da aks tomonda joylashtirilgan.

---

### 5️⃣ WIC UYALARI (2 ta) - WAN Interface Card Slots

#### 5a. WIC Uyasi 0 (WIC-0)

**Funksiyasi:** Tarmoq konnektori moduli (Serial, ATM, Frame Relay)

**Fizik Xususiyatlari**
| Parametr | Qiymati |
|----------|---------|
| **Turi** | WIC (WAN Interface Card) receptacle |
| **Standart** | Cisco proprietary 2-row receptacle |
| **O'lchamlari** | 73 × 15 mm (receptacle) |
| **Pin Soni** | 2 × 25 = 50 pins |
| **Pin Pitch** | 1.27 mm (0.05") |
| **Qavs Mehanizmi** | Spring-load retention clips (2 ta) |

**Joylashtirilishi**
- **X-axis:** -80 mm (PCB markazidan)
- **Y-axis:** +35 mm (orqa tomon / rear-facing)
- **Z-axis:** +2.5 mm (PCB sirtidan)
- **Orientatsiya:** Vertikal (tik), konnektori orqa devorga qaragan

**Socket Material**
- **Plastik Korp:** Black thermoplastic, UL94-V0
- **Kontakt Pinlari:** Gold-plated copper springs
- **Zamok:** Spring-loaded push clips

**Installed WIC Module Anatomy** (agar mavjud bo'lsa)
- **PCB O'lchamlari:** 70 × 12 × 8 mm
- **Interface Konnektori:** 
  - Serial (DB-9 yoki RJ-45)
  - ATM (SMA yoki LC fiber)
  - Frame Relay (DB-15)
- **Indikator LED-lari:** 2 ta (Activity, Link status)
- **Chiplar:** DSP/Serial converter ICs (2-3 ta)

#### 5b. WIC Uyasi 1 (WIC-1)

**Fizik Xususiyatlari:** Bir xil WIC-0 ga

**Joylashtirilishi**
- **X-axis:** +80 mm (markazidan, aks tomonda)
- **Y-axis:** +35 mm (WIC-0 bilan bir qatorda)
- **Z-axis:** +2.5 mm
- **Masofa (otinasida):** WIC-0 dan 160 mm

---

### 6️⃣ NM MODULI UYALARI (2 ta) - Network Module Slots

#### 6a. NM Moduli Uyasi 0 (NM-MODULE-0)

**Funksiyasi:** Encryption (IPSec), Voice, ATM, Frame Relay modullarini qabul qilish

**Fizik Xususiyatlari**
| Parametr | Qiymati |
|----------|---------|
| **Turi** | NM (Network Module) PCMCIA-style receptacle |
| **O'lchamlari** | 85 × 50 mm (receptacle) |
| **Pin Soni** | 2 × 50 = 100 pins (PCMCIA Type III) |
| **Pin Pitch** | 1.27 mm |
| **Qavs** | Motorized eject mechanism (toggle) |
| **Modul Sig'imi** | Turiga qarab, 128 MB - 512 MB SDRAM internal |

**Joylashtirilishi**
- **X-axis:** -100 mm (PCB markazidan)
- **Y-axis:** -20 mm (markaziy quyi tomonka)
- **Z-axis:** +3.0 mm (receptacle otkritiya)
- **Orientatsiya:** Horizontal (yoniga kiritish)
- **Eject Position:** Chap taraf (Left side), toggle switch

**Socket Material**
- **Metallicshos (Shield):** Aluminum, silver (#c0c0c0)
- **Plastik Korp:** Qora thermoplastic, UL94-V0
- **Kontakt Pinlari:** Gold-plated phosphor bronze
- **Eject Mekhanizmi:** Spring-loaded toggle (manual push to eject)

**Installed Module Anatomy** (agar mavjud bo'lsa)
- **O'lchamlari:** 80 × 45 × 22 mm (Type III card)
- **PCB Qatlami:** 4-layer
- **Processor (opsional):** NE2000-compatible network processor
- **Xotira:** SDRAM BGA packages (4-8 ta)
- **Konnektori:** RJ-45 (Ethernet) yoki SMA/LC (Fiber)
- **LED-lar:** 3-4 ta (Power, Link, Activity, Error)

#### 6b. NM Moduli Uyasi 1 (NM-MODULE-1)

**Fizik Xususiyatlari:** Bir xil NM-MODULE-0 ga

**Joylashtirilishi**
- **X-axis:** +100 mm (markazidan, aks tomonda)
- **Y-axis:** -20 mm (NM-0 bilan bir qatorda)
- **Z-axis:** +3.0 mm
- **Masofa (otinasida):** NM-0 dan 200 mm
- **Eject Position:** O'ng taraf (Right side)

---

### 7️⃣ SOVUTISH VENTILYATORI (COOLING FAN)

**Funksiyasi:** CPU, chipset va IC-larni sovutish, ICH dissipatsiyasi

**Fizik Xususiyatlari**
| Parametr | Qiymati |
|----------|---------|
| **Turi** | Axial cooling fan (centrifugal blower yoki propeller) |
| **Saharli** | 50 mm × 50 mm × 15 mm |
| **Fan Blade Diametri** | 45 mm |
| **Blade Soni** | 7-9 ta plastic blades |
| **Tezligi** | 4000 - 6000 RPM |
| **Otklik Mo'jez** | ~35 dB (sound pressure level) |
| **Tarqatilgan Otklik** | ~200-250 CFM (cubic feet per minute) |
| **Quvvati** | 2W @ 5V DC |
| **Elektrod Turi** | 3-pin (Power, GND, Tachometer) |

**Joylashtirilishi**
- **X-axis:** -160 mm (PCB markazidan)
- **Y-axis:** 0 mm (markaziy chiziq)
- **Z-axis:** +45 mm (sovutish kanal ichida)
- **Orientatsiya:** Aks oq tarafi PCB qatoriga parallel
- **Hava Otklik Yo'nalishi:** Orqadan oldinga (Rear to Front airflow)

**Material va Rang**
- **Korp:** Plastik (ABS), qora (#1a1a1a)
- **Blade:** Plastik (polystyrene), ko'ngiloq qora (#2a2a2a)
- **Elektrot:** Copper coil, sida 0.3 mm diameter
- **Bearing Turi:** Shaftda bronze bearing yoki magnetic levitation

**Konneksiya**
- **Grommet Connector:** 3-pin, 2.54 mm pitch
- **Quvvat:** +5V (mainboard fan power header-dan)
- **Tachometer Signal:** 4 pulses per revolution (RPM monitoring)
- **GND (Ground):** PCB GND plane-ga

**Thermal Management Xususiyatlari**
- **Hava Otklik Yolig'i:**
  - Kirish: Chassis orqa tomon ventilasyon deliklaridan
  - O'tish: PCB va komponentlar ustida (PCB qalinligi boyicha)
  - Chiqish: Chassis ön tomonidagi eshik deliklaridan
- **Sovutish Integrali:** Heat pipe integration (opsional, advanced models)

---

### 8️⃣ ICHKI QUVVAT BLOKI (POWER SUPPLY UNIT - PSU)

**Funksiyasi:** AC input kuchlanmasini nizomlanmagan DC quvvatga aylantirish

**Fizik Xususiyatlari**
| Parametr | Qiymati |
|----------|---------|
| **Turi** | Integrated Switching Power Supply (SMD-based) |
| **Forma Faktori** | PCB-ga biriktirish (non-modular) |
| **O'lchamlari** | 120 × 70 × 35 mm (PCB + magnetics) |
| **Kirish Kuchlanmasi** | 100 - 240V AC, 50/60 Hz, single-phase |
| **Kirish Toki** | 0.8 - 1.5 A (max, 240V input) |
| **Umumiy Quvvat** | 40 - 50 W maksimal |

**Chiqish Quvvatlar (Rails)**
| O'rnatma | Qiymati | Tok Sig'imi | Notiquligi |
|---------|---------|----------|----------|
| **+3.3V** | 3.3V ± 5% | 6 A | Xotira, Low-power logic |
| **+5V** | 5.0V ± 5% | 5 A | Fan, WIC/NM modullar |
| **+12V** | 12V ± 10% | 1 A | Hard drive spindle (opsional) |
| **-5V** | -5V ± 10% | 0.5 A | Serial interface (legacy) |
| **+5V_Standby** | 5.0V | 0.5 A | Watchdog timer, RTC |

**Konneksiya va Interfaylari**
- **Kirish Konnektori:** IEC-320 C14 (3-pin, AC mains)
- **Asosiy Chiqish Konnektori:** 7-pin header (PCB-ga) - +3.3V, +5V, +12V, -5V, GND
- **Fan Quvvat:** 3-pin JST connector (+5V, GND, Tachometer)
- **Enable Signal:** Soft-power on/off control line

**PSU Topologiyasi**
1. **Input Stage:** EMI filter + full-wave rectifier (bridge diode)
   - Filter Capacitor: 100-220µF, 400V rated
   - Diode Bridge: DB405-807 (4 A, 700V)

2. **Primary Switch:** High-frequency switching transformer
   - Switching Frequency: 60-100 kHz
   - Switching IC: UC3842 yoki SG3844 PWM controller
   - MOSFET: IRF510 yoki ekvivalenti (0.75 Ω Rds-on)

3. **Transformer & Magnetics:**
   - Primary Inductance: ~1.5 mH
   - Secondary Winding (Multi-tap):
     - 3.3V winding: 12 turns
     - 5V winding: 18 turns
     - 12V winding: 50 turns
   - Ferrite Core: EI-84 yoki ПМА (PM core)

4. **Output Rectification & Regulation:**
   - Secondary Diodes: Schottky (MBR2045CT) - low forward voltage drop
   - Output Inductors: 22-100µH per rail
   - Capacitors: 
     - 3.3V: 220µF × 2 (5V rated, SMD 1206)
     - 5V: 470µF × 2 (10V rated, SMD 1206)
     - 12V: 100µF (16V rated, SMD 1206)
   - Linear Regulators: LM317/LM337 series (backup regulation, opsional)

**Joylashtirilishi**
- **X-axis:** +150 mm (PCB markazidan, ön tomonka)
- **Y-axis:** -35 mm (orqa quyi burchagi)
- **Z-axis:** +2.0 mm (PCB sirtidan)
- **Orientatsiya:** PCB-ning quyi-o'ng burchakida, koeffitsiyi tizziz

**Material va Rang**
- **PCB Rang:** Zangga chidamli, yeşil (#2a5a3a) yoki qora (#0a0a0a)
- **Transformer Shielding:** Mu-metal, silver (#c0c0c0)
- **Capacitor Turi:** Electrolytic (aluminum) yoki ceramic (SMD 1206)
- **Inductor Ternary:** Ferrite toroid, bige #8b7500 (tan color)

**Thermal Management**
- **Dissipation:** ~8-10W heat generation
- **MOSFET Heat Sink:** Aluminum pad (10 × 15 mm), fan-cooled indirect

**Protection & Safety Features**
- **Overload Protection:** Electronic current limiting
- **Thermal Shutdown:** 90°C internal temperature
- **Input Protection:** Fuse 2A/250V (AC mains)
- **Output Protection:** Series output inductors (soft-start)

---

### 9️⃣ HDD BAY / HARD DRIVE MOUNTING AREA

**Funksiyasi:** PCMCIA CompactFlash yoki 2.5" HDD o'rnatish uchun (opsional modul)

**Fizik Xususiyatlari**
| Parametr | Qiymati |
|----------|---------|
| **Turi** | CompactFlash Type I/II bayoneti yoki 2.5" HDD uy |
| **O'lchamlari** | 85 × 50 × 25 mm (cavity) |
| **Montaj Mekanizmi** | Plastic caddy + 4 × M3 bolts |
| **Interfeys** | PCMCIA (16-bit) yoki PATA (IDE) |
| **Quvvat Xotirasi** | 5V, GND (opsional +12V spindle motor uchun) |

**Joylashtirilishi**
- **X-axis:** 0 mm (markaziy)
- **Y-axis:** -50 mm (orqa quyi quyi)
- **Z-axis:** +5 mm (accessible mounting location)
- **Orientatsiya:** Horizontal (yoniga kiritish yoki ustiga o'rnatish)

**Cavity Design**
- **Matritsa:** Polycarbonate plastic, qora (#1a1a1a)
- **Caddy Plastiki:** Thermoplastic, blue-gray (#5a7a9a) yoki qora
- **EMI Shielding:** Optional Mylar pouch lining

---

### 🔟 I/O RISER PLATA (IO-RISER BOARD)

**Funksiyasi:** Tashqi konektorlarni o'rnatish (Ethernet, Serial, Power, Reset)

**Fizik Xususiyatlari**
| Parametr | Qiymati |
|----------|---------|
| **O'lchamlari** | 85 × 40 × 12 mm (vertical orientation) |
| **Qatlamlar** | 4-layer PCB |
| **Connectors onboard** | 4-6 ta |

**Konnektor Inventari**
1. **RJ-45 Ethernet (Management Interface)**
   - Turi: 10Base-T, Category 5e
   - Konnektori: Modular RJ-45 jack
   - LED-lar: 2 × 3mm (Power, Link/Activity)
   - Impedansiya: 100 Ω differential

2. **Serial Konnektori (Console Port)**
   - Turi: DB-9 (9-pin D-sub) yoki RJ-45
   - Standart: EIA-232 (RS-232)
   - Baud Rates: 9600 bps default
   - Pin Configuration:
     - Pin 1: DCD (Data Carrier Detect)
     - Pin 2: RXD (Received Data)
     - Pin 3: TXD (Transmitted Data)
     - Pin 4: DTR (Data Terminal Ready)
     - Pin 5: GND (Signal Ground)
     - Pin 6: DSR (Data Set Ready)
     - Pin 7: RTS (Request to Send)
     - Pin 8: CTS (Clear to Send)
     - Pin 9: RI (Ring Indicator)

3. **AC Quvvat Konnektori**
   - Turi: IEC-320 C14 (3-pin)
   - Kanal: 100-240V AC, 50-60Hz
   - Fuse: 2A/250V slow-blow

4. **Reset Tugmasi (Push-button)**
   - Turi: Momentary contact switch
   - Funksiyasi: System reboot/warm reset
   - Pini: 2-pin, momentary action
   - Switch Rating: 50 mA, 50V

5. **LED Indikatorlari (Status Lights)**
   - **POWER (Quvvat):** Yashil LED, +5V direct
   - **RPS (Redundant Power Supply - opsional):** Yashil LED (backup PSU detected)
   - **ACTIVITY (Faoliyat):** Sariq LED, system activity signal
   - LED Rating: 3mm diffused lenses
   - Current Limiting: 470Ω resistor per LED

**Joylashtirilishi**
- **X-axis:** 0 mm (markaziy)
- **Y-axis:** -42.5 mm (tashqi orqa devorga mahkamlash)
- **Z-axis:** +32 mm (yuqori qismi, chassis devorida)
- **Orientatsiya:** Vertikal (tik, konnektor tashqariga qaragan)
- **Mounting Method:** 4 × M3 brass standoff

**Material va Rang**
- **PCB Rang:** Yeşil (#2a5a3a) yoki qora (#0a0a0a)
- **Metall Shield:** Aluminum, EMI shielding (opsional)
- **Button Material:** Plastic, red (#8b0000) push-cap

---

### 1️⃣1️⃣ YUQORI QOPQOQ / TOP COVER

**Funksiyasi:** Chassis zamonaviy ko'rinish, EMI shielding, cooling airflow guidance

**Fizik Xususiyatlari**
| Parametr | Qiymati |
|----------|---------|
| **O'lchamlari** | 440 × 110 mm (chassis tashqi o'lchamlariga mos) |
| **Qalinligi** | 1.5 mm aluminum alloy (A6063-T5) |
| **Rang** | Midnight Blue (#1a3a4a), matte anodized finish |
| **Gril / Hava Deliqlari** | 3 × 4 mm slits, 25 mm spacing (ventilasyon) |

**Qopqoq Texnalogiyasi**
- **Hava Kanal-lar:** Ichki qavlinki struktura, airflow ko'proq xisoblangan
- **EMI Shielding:** Copper mesh liner (#c9932e), ground spring kontakti
- **Hinge Mekanizmi:** 2 × Stainless steel (friction hinge yoki ball-bearing)
- **Latch Points:** 4 × magnetic snap-fit clips (opsional), 2 × screw holes

**Mounting Points**
- **Orqa chiziq:** 4 × threaded inserts (M3)
- **Ön chiziq:** 2 × snap-fit latches
- **Yon tomonlar:** Integrated groove (seal)

**Material va Finish**
- **Asosiy Material:** Aluminum 6063-T5 extrusion
- **Eksternal Finish:** Anodized, matte (luster level 25-35%)
- **Ichki Qatlamla:** Black epoxy powder coat (#0a0a0a)
- **Akzent Markering:** "CISCO SYSTEMS" logotipi + "2600 Series" text

---

### 1️⃣2️⃣ ASOSIY RAMA / BASE FRAME va SHASSIY STRUKTURA

**Funksiyasi:** Barcha komponentlarni o'rnatish uchun tarkib, mehanik kuchayitish

**Fizik Xususiyatlari**
| Parametr | Qiymati |
|----------|---------|
| **Turi** | Welded aluminum frame + steel reinforcement |
| **O'lchamlari** | 440 × 110 × 70 mm (external) |
| **Tezik Qalinligi** | 1.2 mm aluminum, 1.6 mm steel |
| **Og'irligi** | ~1.2 kg (frame alone) |

**Frame Components**
1. **Asosiy Plata Platform:**
   - PCB stand-off posts: 8 × brass inserts, M3 threaded
   - Posts Height: 15 mm (PCB to interior bottom)
   - Posts Spacing: 40 mm grid (ITX/mATX standard)

2. **Orqa Devor Ushlab Turish:**
   - Aluminum C-profile, 20 × 20 mm cross-section
   - I/O Riser mounting points: 4 × M3
   - EMI shield ground points: Multiple spring contacts

3. **Yon Pannellar:**
   - Left panel: Smooth aluminum surface
   - Right panel: Intake vent slots (3 × 50 mm horizontal slits)
   - Bottom panel: Cooling airflow guide (integrated baffle)
   - Front panel: Smooth, "CISCO" branded

4. **Feet & Vibration Isolation:**
   - Turi: Rubber isolation pads (elastomer, Shore A 60-70)
   - Joylashtirilishi: 4 corners + 2 midpoints (6 total)
   - Diametri: 12 mm, height 5 mm
   - Rasm: Qora (#0a0a0a) neoprene

**Ventilasyon Kanallar**
- **Orqa kiritish:** 100 × 30 mm opening (turi: horizontal slits)
- **Ön chiqish:** 120 × 40 mm opening (turi: horizontal slits)
- **Masofa:** 10 mm clearance for airflow (no blockage)

**Grounding Points**
- **Earth Reference Plane:** Aluminum frame chassis ground
- **EMI Spring Contacts:** 4 × phosphor bronze springs, PCB-to-frame
- **AC Grounding:** Power supply earth (IEC C14 pin 1)

**Material va Rang**
- **Aluminum Profil:** Anodized silver (#c0c0c0), 15 µm thickness
- **Steel Reinforcement:** Zinc-plated (#d4d4d4), corrosion resistance
- **Internal Paint:** Black epoxy (#0a0a0a)
- **Feet Rubber:** Black neoprene (#0a0a0a)

---

## 📐 3D MODELING VA ASSEMBLY REFERENCE

### Three.js Implementation Strategy

```javascript
// Cisco 2600 Main Assembly
const chassis = new THREE.Group();
chassis.name = "Cisco2600_Main";

// 1. Base Frame
const frameGeometry = new THREE.BoxGeometry(440, 70, 110);
const frameMaterial = new THREE.MeshStandardMaterial({
  color: 0xc0c0c0,
  roughness: 0.5,
  metallic: 1.0
});
const frame = new THREE.Mesh(frameGeometry, frameMaterial);
chassis.add(frame);

// 2. System PCB Motherboard
const pcbGeometry = new THREE.BoxGeometry(380, 2, 85);
const pcbMaterial = new THREE.MeshStandardMaterial({
  color: 0x0a0a0a,
  roughness: 0.65,
  map: fr4TextureMap
});
const pcb = new THREE.Mesh(pcbGeometry, pcbMaterial);
pcb.position.set(0, 15, 0);
chassis.add(pcb);

// 3. CPU (MIPS R4700)
const cpuGeometry = new THREE.BoxGeometry(28, 4, 28);
const cpuMaterial = new THREE.MeshStandardMaterial({
  color: 0x0d0d0d,
  roughness: 0.4
});
const cpu = new THREE.Mesh(cpuGeometry, cpuMaterial);
cpu.position.set(-60, 17, -20);
chassis.add(cpu);

// 4. DRAM Slot 0 & 1
const dramSlotGeometry = new THREE.BoxGeometry(10, 2, 133);
const dramSocketMaterial = new THREE.MeshStandardMaterial({
  color: 0x1a1a1a,
  roughness: 0.6
});

const dramSlot0 = new THREE.Mesh(dramSlotGeometry, dramSocketMaterial);
dramSlot0.position.set(-120, 17, 15);
dramSlot0.rotation.z = Math.PI / 2;
chassis.add(dramSlot0);

const dramSlot1 = new THREE.Mesh(dramSlotGeometry, dramSocketMaterial);
dramSlot1.position.set(120, 17, 15);
dramSlot1.rotation.z = Math.PI / 2;
chassis.add(dramSlot1);

// 5. WIC Slot 0 & 1
const wicGeometry = new THREE.BoxGeometry(15, 2, 73);
const wicMaterial = new THREE.MeshStandardMaterial({
  color: 0x1a1a1a,
  roughness: 0.6
});

const wicSlot0 = new THREE.Mesh(wicGeometry, wicMaterial);
wicSlot0.position.set(-80, 17.5, 35);
chassis.add(wicSlot0);

const wicSlot1 = new THREE.Mesh(wicGeometry, wicMaterial);
wicSlot1.position.set(80, 17.5, 35);
chassis.add(wicSlot1);

// 6. Cooling Fan
const fanGeometry = new THREE.CylinderGeometry(22.5, 22.5, 15, 32);
const fanMaterial = new THREE.MeshStandardMaterial({
  color: 0x1a1a1a,
  roughness: 0.4
});
const fan = new THREE.Mesh(fanGeometry, fanMaterial);
fan.position.set(-160, 45, 0);
fan.rotation.z = Math.PI / 2;
chassis.add(fan);

// 7. Power Supply Module
const psuGeometry = new THREE.BoxGeometry(120, 35, 70);
const psuMaterial = new THREE.MeshStandardMaterial({
  color: 0x2a2a2a,
  roughness: 0.6,
  metallic: 0.3
});
const psu = new THREE.Mesh(psuGeometry, psuMaterial);
psu.position.set(150, 17.5, -35);
chassis.add(psu);

// 8. Top Cover
const coverGeometry = new THREE.BoxGeometry(440, 1.5, 110);
const coverMaterial = new THREE.MeshStandardMaterial({
  color: 0x1a3a4a,
  roughness: 0.4
});
const topCover = new THREE.Mesh(coverGeometry, coverMaterial);
topCover.position.set(0, 56, 0);
chassis.add(topCover);

// 9. IO Riser Board (Rear connectors)
const ioRiserGeometry = new THREE.BoxGeometry(85, 12, 40);
const ioRiserMaterial = new THREE.MeshStandardMaterial({
  color: 0x2a5a3a,
  roughness: 0.6
});
const ioRiser = new THREE.Mesh(ioRiserGeometry, ioRiserMaterial);
ioRiser.position.set(0, 32, -42.5);
ioRiser.rotation.x = Math.PI / 2;
chassis.add(ioRiser);

// Final assembly
scene.add(chassis);
```

### Fotogrammetrik O'lchovlar (Rasm-1 va Rasm-2 asosida)

| Komponent | X (mm) | Y (mm) | Z (mm) | Qayd |
|-----------|--------|--------|--------|------|
| PCB Motherboard | 0 | 15 | 0 | Markaziy |
| CPU (MIPS) | -60 | 17 | -20 | PCB quyi-chap |
| Boot ROM Flash | 40 | 17 | -15 | CPU o'ng tarafida |
| DRAM Slot 0 | -120 | 17 | 15 | Chap tomonka |
| DRAM Slot 1 | 120 | 17 | 15 | O'ng tomonka |
| WIC Slot 0 | -80 | 17.5 | 35 | Orqa chap |
| WIC Slot 1 | 80 | 17.5 | 35 | Orqa o'ng |
| NM Module 0 | -100 | 17 | -20 | Quyi quyi-chap |
| NM Module 1 | 100 | 17 | -20 | Quyi quyi-o'ng |
| Fan (cooling) | -160 | 45 | 0 | Yon tomondan sovutish |
| PSU | 150 | 17.5 | -35 | Ön quyi-o'ng |
| I/O Riser | 0 | 32 | -42.5 | Orqa vertikal |
| Top Cover | 0 | 56 | 0 | Yuqori |

---

## 🎨 MATERIAL PBR JADAVALI

| Komponent | Base Color | Roughness | Metallic | Normal Map |
|-----------|-----------|-----------|----------|-----------|
| PCB (FR-4) | #0a0a0a | 0.65 | 0.0 | Woven texture |
| Copper Traces | #c9932e | 0.3 | 1.0 | Fine scratches |
| Gold Contacts | #d4af37 | 0.3 | 1.0 | Polished |
| CPU (Ceramic) | #0d0d0d | 0.4 | 0.0 | Matte |
| Heat Sink (Al) | #c0c0c0 | 0.5 | 1.0 | Brushed |
| Aluminum Frame | #c0c0c0 | 0.5 | 1.0 | Anodized |
| Plastic (Sockets) | #1a1a1a | 0.6 | 0.0 | Molded texture |
| Fan Blade | #2a2a2a | 0.4 | 0.0 | Smooth |
| Top Cover | #1a3a4a | 0.4 | 0.0 | Matte powder coat |
| Steel Posts | #d4d4d4 | 0.3 | 1.0 | Zinc-plated |

---

## ✅ KUALITAS TEKISINI CHECKLIST

- [ ] Barcha komponentlar o'lchamlari ±0.5 mm aniqlikda
- [ ] Joylashtirilishi fotogrammetrik referenclarga mos
- [ ] PBR material-lar realistik (metal, matcha qirish)
- [ ] Ventilasyon kanallar airflow simulyatsiyasiga tayyor
- [ ] LED indikatorlari functional (opsional animation)
- [ ] Mounting points PCB standoff-lari bilan aligned
- [ ] Connector gometryalari Cisco dokumentlar bilan solyashuvchi
- [ ] EMI shielding mesh pattern ko'rsatilgan
- [ ] Fan rotation axis to'g'ri oritentatsiyada
- [ ] Assembly hierarchy modular va optimized

---

**Tayyorlangan:** May 2026
**Versiya:** 2.0 - Complete Interior Reference
**Manba:** Cisco 2600 Series Hardware Installation Guide + Photogrammetric Analysis

