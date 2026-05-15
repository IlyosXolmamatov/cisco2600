import { useState, useEffect } from "react";
import titul from "../assets/Titul2.png";
import VideoTutorials from "./VideoTutorials";

const pdfFile = "/nazariy-malumot.pdf";

interface IntroPagesProps {
  onComplete: () => void;
  onBack?: () => void;
  onMenuStart?: () => void;
  startAtMenu?: boolean;
}

type MenuSection = "nazariy" | "video" | "3d" | "funksional" | "ishlash";

const menuItems: { id: MenuSection; title: string; icon: string }[] = [
  { id: "nazariy", title: "Nazariy Ma'lumot", icon: "📚" },
  { id: "video", title: "Video Darslik", icon: "🎥" },
  { id: "3d", title: "3D Modeli", icon: "🔧" },
  { id: "funksional", title: "Funksional Sxemalari", icon: "⚙️" },
  { id: "ishlash", title: "Ishlash Prinsipi", icon: "💡" },
];

export default function IntroPages({
  onComplete,
  onBack,
  onMenuStart,
  startAtMenu = false,
}: IntroPagesProps) {
  const [currentPage, setCurrentPage] = useState<"title" | "menu">(() => {
    const saved = localStorage.getItem("introCurrentPage");
    if (saved === "menu" || startAtMenu) return "menu";
    return "title";
  });

  const [selectedSection, setSelectedSection] = useState<MenuSection | null>(
    () => {
      const saved = localStorage.getItem("introSelectedSection");
      return saved as MenuSection | null;
    },
  );

  // Holatni localStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem("introCurrentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (selectedSection) {
      localStorage.setItem("introSelectedSection", selectedSection);
    }
  }, [selectedSection]);

  const handleSelectSection = (sectionId: MenuSection) => {
    setSelectedSection(sectionId);
    localStorage.setItem("introSelectedSection", sectionId);

    // Agar 3D modeli tanlansa, 3D page ochilsin
    if (sectionId === "3d") {
      // Menu sahifasiga qaytish uchun flag yuborish
      onComplete?.();
    }
  };

  return (
    <div className="fixed inset-0 bg-linear-to-br from-gray-950 via-blue-950 to-gray-950 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* TITUL VARAQ (1-QI QISM) */}
      {currentPage === "title" && (
        <div className="relative z-10 text-center">
          <img
            src={titul}
            alt="Cisco 2600 Seriyasi"
            width={800}
            className="mb-8 drop-shadow-2xl"
          />
          <button
            onClick={() => {
              setCurrentPage("menu");
              onMenuStart?.();
            }}
            className="px-8 py-3 rounded-lg font-semibold bg-linear-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 border border-blue-400/30"
          >
            Boshlash →
          </button>
        </div>
      )}

      {/* MENU QISMI (2-QI QISM) */}
      {currentPage === "menu" && (
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
          {/* Menu Panel - Doim Ochiq */}
          <div className="hidden md:flex w-80 bg-linear-to-b from-gray-950/95 to-blue-950/95 backdrop-blur-xl border-r border-white/10 shadow-2xl flex-col">
            <div className="pt-8 px-6 space-y-3 flex-1 overflow-y-auto">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 border ${
                    selectedSection === item.id
                      ? "bg-blue-500/30 border-blue-400/60 text-white"
                      : "border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-semibold">{item.title}</span>
                  </div>
                </button>
              ))}
            </div>
            {/* Sidebar Bottom Back Button */}
            <div className="px-6 py-4 border-t border-white/10">
              <button
                onClick={() => {
                  setCurrentPage("title");
                  setSelectedSection(null);
                }}
                className="w-full px-4 py-2 rounded-lg font-semibold bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-white/10 transition-all duration-300"
              >
                ← Orqaga
              </button>
            </div>
          </div>

          {/* Mobile Menu - Top Bar */}
          <div className="md:hidden w-full bg-linear-to-b from-gray-950/95 to-blue-950/95 backdrop-blur-xl border-b border-white/10 p-3">
            {!selectedSection ? (
              // Show all menu items when no section is selected
              <div className="flex flex-wrap gap-2 justify-start">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectSection(item.id)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 border text-xs md:text-sm whitespace-nowrap ${
                      selectedSection === item.id
                        ? "bg-blue-500/30 border-blue-400/60 text-white"
                        : "border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <span className="hidden sm:inline">{item.icon} </span>
                    <span className="text-xs">
                      {item.title.substring(0, 8)}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              // Show only back button when a section is selected
              <button
                onClick={() => {
                  setSelectedSection(null);
                  if (startAtMenu) onBack?.();
                }}
                className="w-full px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
              >
                ← Orqaga
              </button>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-6 py-6 overflow-y-auto w-full">
            {selectedSection === "nazariy" && (
              <div className="w-full h-full bg-gray-950/40 backdrop-blur-sm border border-white/10 rounded-lg flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-gray-950/80 border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
                  <h2 className="text-2xl font-bold text-white">
                    📚 Nazariy Ma'lumot
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedSection(null);
                      if (startAtMenu) onBack?.();
                    }}
                    className="px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                  >
                    ← Orqaga
                  </button>
                </div>
                {/* PDF Viewer */}
                <div className="flex-1 overflow-hidden bg-gray-900">
                  <iframe
                    src={pdfFile}
                    className="w-full h-full border-0"
                    title="Nazariy Ma'lumot PDF"
                  />
                </div>
              </div>
            )}

            {selectedSection === "video" && (
              <div className="w-full h-full bg-gray-950/40 backdrop-blur-sm border border-white/10 rounded-lg flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-gray-950/80 border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
                  <h2 className="text-2xl font-bold text-white">
                    🎥 Video Darslik
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedSection(null);
                      if (startAtMenu) onBack?.();
                    }}
                    className="px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                  >
                    ← Orqaga
                  </button>
                </div>
                {/* Video Tutorials */}
                <div className="flex-1 overflow-auto bg-gray-900 flex items-start justify-center p-6">
                  <div className="w-full max-w-2xl">
                    <VideoTutorials />
                  </div>
                </div>
              </div>
            )}

            {selectedSection === "funksional" && (
              <div className="w-full h-full bg-gray-950/40 backdrop-blur-sm border border-white/10 rounded-lg flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-gray-950/80 border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
                  <h2 className="text-2xl font-bold text-white">
                    ⚙️ Funksional Sxemalari
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedSection(null);
                      if (startAtMenu) onBack?.();
                    }}
                    className="px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                  >
                    ← Orqaga
                  </button>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-auto bg-gray-900 p-6">
                  <div className="text-gray-300 space-y-6 max-w-3xl">
                    {/* Umumiy Ko'rinish */}
                    <section>
                      <h3 className="text-lg font-bold text-blue-400 mb-3">
                        📋 Umumiy Ko'rinish
                      </h3>
                      <p className="text-sm leading-relaxed">
                        Cisco 2600 series router-lari modular platform bo'lib,
                        qo'shimcha interface kartochkalari (WIC, NM) qo'shish
                        imkoniyatini beradi.
                      </p>
                      <div className="mt-3 bg-gray-950/40 p-3 rounded border border-white/10">
                        <p className="text-xs font-semibold text-cyan-400 mb-2">
                          Asosiy Xususiyatlari:
                        </p>
                        <ul className="text-xs space-y-1 text-gray-300">
                          <li>
                            ✓{" "}
                            <span className="text-yellow-400">
                              Ikki Processor Arxitekturasi:
                            </span>{" "}
                            CPU1 (Qurilish), CPU2 (I/O)
                          </li>
                          <li>
                            ✓{" "}
                            <span className="text-yellow-400">
                              Modular Joylar:
                            </span>{" "}
                            2 × WIC + 2 × NM
                          </li>
                          <li>
                            ✓ <span className="text-yellow-400">Xotira:</span>{" "}
                            ROM (Boot), DRAM (Asosiy), NVRAM (Sozlama)
                          </li>
                          <li>
                            ✓{" "}
                            <span className="text-yellow-400">O'tkazish:</span>{" "}
                            1-2 Gbps switch talaqi
                          </li>
                        </ul>
                      </div>
                    </section>

                    {/* Processor Subsystem */}
                    <section>
                      <h3 className="text-lg font-bold text-blue-400 mb-3">
                        🔧 Processor Subsystem
                      </h3>
                      <div className="bg-gray-950/40 p-3 rounded border border-white/10 text-xs space-y-2">
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Asosiy Protsessor:
                          </span>{" "}
                          MIPS R4700 @ 100 MHz
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            ISA:
                          </span>{" "}
                          MIPS III (32-bit)
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Kesh:
                          </span>{" "}
                          32 KB Ko'rsatma + 32 KB Ma'lumot
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Quvur:
                          </span>{" "}
                          5-bosqich (IF-DEC-EX-MEM-WB)
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            ALU:
                          </span>{" "}
                          Arifmetik, Mantiq, Yuklash/Saqlash Birliklari
                        </p>
                      </div>
                    </section>

                    {/* Memory Hierarchy */}
                    <section>
                      <h3 className="text-lg font-bold text-blue-400 mb-3">
                        💾 Memory Hierarchy
                      </h3>
                      <div className="space-y-2 text-xs">
                        <div className="bg-gray-950/40 p-2 rounded border border-green-500/30">
                          <p className="text-green-400 font-semibold">
                            L1 Kesh:
                          </p>
                          <p className="text-gray-300">
                            Ko'rsatma: 32 KB | Ma'lumot: 32 KB | Topish Vaqti:
                            1-2ns
                          </p>
                        </div>
                        <div className="bg-gray-950/40 p-2 rounded border border-blue-500/30">
                          <p className="text-blue-400 font-semibold">
                            Asosiy Xotira (DRAM):
                          </p>
                          <p className="text-gray-300">
                            512 MB (2×256MB) | SDRAM PC133 @ 133 MHz | ~1 GB/s
                          </p>
                        </div>
                        <div className="bg-gray-950/40 p-2 rounded border border-purple-500/30">
                          <p className="text-purple-400 font-semibold">
                            Saqlash (Flash/NVRAM):
                          </p>
                          <p className="text-gray-300">
                            Boot Flash: 8 MB | NVRAM: 128 KB | O'zgaruvchan emas
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* System Bus */}
                    <section>
                      <h3 className="text-lg font-bold text-blue-400 mb-3">
                        🚀 System Bus (32-bit)
                      </h3>
                      <div className="bg-gray-950/40 p-3 rounded border border-white/10 text-xs space-y-2">
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Manzil Avtobusi:
                          </span>{" "}
                          24-bit (16 MB manzilash)
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Ma'lumot Avtobusi:
                          </span>{" "}
                          32-bit (4 bayt parallel)
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Nazorat:
                          </span>{" "}
                          O'QI, YOZ, QAYTA TIKLASH, INTERRUPT
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Soat:
                          </span>{" "}
                          50-100 MHz
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Sorovnoma:
                          </span>{" "}
                          CPU ustunligi, I/O, DMA
                        </p>
                      </div>
                    </section>

                    {/* Power Distribution */}
                    <section>
                      <h3 className="text-lg font-bold text-blue-400 mb-3">
                        ⚡ Power Distribution
                      </h3>
                      <div className="space-y-2 text-xs">
                        <table className="w-full border-collapse">
                          <tbody className="divide-y divide-white/10">
                            <tr className="bg-gray-950/20">
                              <td className="p-2 text-yellow-400 font-semibold">
                                +3.3V
                              </td>
                              <td className="p-2 text-gray-300">
                                6A maks, 20W (DRAM, ROM, I/O)
                              </td>
                            </tr>
                            <tr className="bg-gray-950/20">
                              <td className="p-2 text-cyan-400 font-semibold">
                                +5V
                              </td>
                              <td className="p-2 text-gray-300">
                                5A maks, 25W (CPU, WIC, NM)
                              </td>
                            </tr>
                            <tr className="bg-gray-950/20">
                              <td className="p-2 text-red-400 font-semibold">
                                +12V
                              </td>
                              <td className="p-2 text-gray-300">
                                1A maks, 12W (Ventilator, HDD)
                              </td>
                            </tr>
                            <tr className="bg-gray-950/20">
                              <td className="p-2 text-gray-400 font-semibold">
                                -5V
                              </td>
                              <td className="p-2 text-gray-300">
                                0.5A maks, 2.5W (Eski usul)
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>

                    {/* Thermal Management */}
                    <section>
                      <h3 className="text-lg font-bold text-blue-400 mb-3">
                        ❄️ Soginish va Ventilasyon
                      </h3>
                      <div className="bg-gray-950/40 p-3 rounded border border-white/10 text-xs space-y-2">
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Issiqlik Ishji:
                          </span>{" "}
                          ~40W (eng yomon holat)
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Ventilator:
                          </span>{" "}
                          50mm o'qi, 4000-6000 RPM, 200-250 CFM
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Kirish:
                          </span>{" "}
                          Orqa (3×50mm joylar)
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Chiqish:
                          </span>{" "}
                          Old (3×40mm joylar)
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Passiv Soginish:
                          </span>{" "}
                          Alyuminium sovitish panellari
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Harorat Chegarasi:
                          </span>{" "}
                          70°C
                        </p>
                      </div>
                    </section>

                    {/* Error Detection */}
                    <section>
                      <h3 className="text-lg font-bold text-blue-400 mb-3">
                        🛡️ Xavfsizlik va Monitoring
                      </h3>
                      <div className="bg-gray-950/40 p-3 rounded border border-white/10 text-xs space-y-2">
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Kuzatuv Taymer:
                          </span>{" "}
                          Avtomatik sistema tiklanishi
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Paritet Tekshiruvi:
                          </span>{" "}
                          Xotira xatosi aniqlanishi
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Harorat Monitoringi:
                          </span>{" "}
                          Real-vaqt sensori
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            Quvvat Nazoratchi:
                          </span>{" "}
                          Kuchning susayishi himoyasi
                        </p>
                        <p>
                          <span className="text-yellow-400 font-semibold">
                            CRC Tekshiruvi:
                          </span>{" "}
                          Boot tasvir butunligi
                        </p>
                      </div>
                    </section>

                    <div className="text-center text-xs text-gray-500 pt-4 border-t border-white/10">
                      📖 Cisco 2600 Funksional Sxema - Batafsil Arxitektura
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedSection === "ishlash" && (
              <div className="w-full h-full bg-gray-950/40 backdrop-blur-sm border border-white/10 rounded-lg flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-gray-950/80 border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
                  <h2 className="text-2xl font-bold text-white">
                    💡 Ishlash Prinsipi
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedSection(null);
                      if (startAtMenu) onBack?.();
                    }}
                    className="px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                  >
                    ← Orqaga
                  </button>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-auto bg-gray-900 p-6">
                  <div className="space-y-8">
                    <div>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        Cisco 2600 marshrutizatori paketlarni turli xil tarmoq
                        interfeyslarida qanday yo'naltiradi va boshqaradi,
                        shularni quyida ko'rishingiz mumkin:
                      </p>
                    </div>

                    {/* GIF Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* GIF 1 */}
                      <div className="bg-gray-800/50 rounded-lg overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                        <div className="bg-black p-4">
                          <img
                            src="/src/assets/Router-Functions-Example.gif"
                            alt="Router Functions Example"
                            className="w-full h-64 object-cover rounded"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="text-blue-400 font-semibold mb-2">
                            Marshrutizator Funksiyalari
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Cisco 2600 marshrutizatorining asosiy funksiyalari:
                            paketlarni tahlil qilish, marshrutizatsiya jadvali
                            bo'yicha qo'llash va to'g'ri chiqish portiga
                            yo'naltirish.
                          </p>
                        </div>
                      </div>

                      {/* GIF 2 */}
                      <div className="bg-gray-800/50 rounded-lg overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                        <div className="bg-black p-4">
                          <img
                            src="/src/assets/router-on-a-stick-animation.gif"
                            alt="Router on a Stick Animation"
                            className="w-full h-64 object-cover rounded"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="text-blue-400 font-semibold mb-2">
                            Router-on-a-Stick Animatsiyasi
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Bitta Ethernet portida VLAN trafiki bilan qanday
                            ishlash mumkinligini ko'rsatadi. Tag qo'shilgan
                            frame-lar ishlab chiqiladi va to'g'ri VLAN-ga
                            yo'naltiriladi.
                          </p>
                        </div>
                      </div>

                      {/* GIF 3 */}
                      <div className="bg-gray-800/50 rounded-lg overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                        <div className="bg-black p-4">
                          <img
                            src="/src/assets/router-on-a-stick-logical-view.gif"
                            alt="Router on a Stick Logical View"
                            className="w-full h-64 object-cover rounded"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="text-blue-400 font-semibold mb-2">
                            Router-on-a-Stick Mantiqiy Sxema
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            VLAN trafiki mantiqiy qanday tuzilganini va
                            marshrutizator bilan qanday aloqa qurganini
                            tasvirlaydi. Har bir VLAN alohida tarmoq segmenti
                            sifatida qaraladi.
                          </p>
                        </div>
                      </div>

                      {/* GIF 4 */}
                      <div className="bg-gray-800/50 rounded-lg overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                        <div className="bg-black p-4">
                          <img
                            src="/src/assets/routing-between-vlans.gif"
                            alt="Routing Between VLANs"
                            className="w-full h-64 object-cover rounded"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="text-blue-400 font-semibold mb-2">
                            VLAN-lar Orasidagi Marshrutizatsiya
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Turli VLAN-larda joylashgan qurilmalar o'rtasida
                            paketlar qanday yo'naltiriladi. IP manzillari va
                            marshrutizatsiya algoritmiga asoslangan trafikni
                            boshqarish.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-4 mt-6">
                      <p className="text-blue-300 text-sm leading-relaxed">
                        💡 <b>Eslatma:</b> Yuqoridagi animatsiyalar Cisco 2600
                        marshrutizatorining asosiy ishlash tamoyillarini vizual
                        tarzda tushuntiradi. Har bir rasmni diqqat bilan ko'rib
                        chiqib, marshrutizatsiya mexanizmini tushunishga yordam
                        beradi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!selectedSection && (
              <div className="w-full h-full bg-gray-950/40 backdrop-blur-sm border border-white/10 rounded-lg flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold text-white">
                    Taklif va murojaatlar uchun
                  </h3>
                  <div className="bg-blue-500/20 border border-red-500/40 rounded-lg p-4">
                    <p className="text-white font-semibold text-lg">
                      sobirjanovabror7983@gmail.com
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Agar muammoga duch kelsangiz, iltimos yuqoridagi email
                    orqali bog'lanish.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
