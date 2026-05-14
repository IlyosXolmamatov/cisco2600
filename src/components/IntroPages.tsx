import { useState } from "react";
import titul from "../assets/Titul2.png";

const pdfFile = "/nazariy-malumot.pdf";

interface IntroPagesProps {
  onComplete: () => void;
  onBack?: () => void;
  onMenuStart?: () => void;
  startAtMenu?: boolean;
}

type MenuSection = 'nazariy' | 'video' | '3d' | 'funksional' | 'ishlash';

const menuItems: { id: MenuSection; title: string; icon: string }[] = [
  { id: 'nazariy', title: 'Nazariy Ma\'lumot', icon: '📚' },
  { id: 'video', title: 'Video Darslik', icon: '🎥' },
  { id: '3d', title: '3D Modeli', icon: '🔧' },
  { id: 'funksional', title: 'Funksional Sxemalari', icon: '⚙️' },
  { id: 'ishlash', title: 'Ishlash Prinsipi', icon: '💡' },
];

export default function IntroPages({ onComplete, onBack, onMenuStart, startAtMenu = false }: IntroPagesProps) {
  const [currentPage, setCurrentPage] = useState<'title' | 'menu'>(startAtMenu ? 'menu' : 'title');
  const [selectedSection, setSelectedSection] = useState<MenuSection | null>(null);

  const handleSelectSection = (sectionId: MenuSection) => {
    setSelectedSection(sectionId);

    // Agar 3D modeli tanlansa, 3D page ochilsin
    if (sectionId === '3d') {
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
      {currentPage === 'title' && (
        <div className="relative z-10 text-center">
          <img
            src={titul}
            alt="Cisco 2600 Seriyasi"
            width={800}
            className="mb-8 drop-shadow-2xl"
          />
          <button
            onClick={() => {
              setCurrentPage('menu');
              onMenuStart?.();
            }}
            className="px-8 py-3 rounded-lg font-semibold bg-linear-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 border border-blue-400/30"
          >
            Boshlash →
          </button>
        </div>
      )}

      {/* MENU QISMI (2-QI QISM) */}
      {currentPage === 'menu' && (
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
          {/* Menu Panel - Doim Ochiq */}
          <div className="hidden md:flex w-80 bg-linear-to-b from-gray-950/95 to-blue-950/95 backdrop-blur-xl border-r border-white/10 shadow-2xl flex-col">
            <div className="pt-8 px-6 space-y-3 flex-1 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 border ${
                    selectedSection === item.id
                      ? 'bg-blue-500/30 border-blue-400/60 text-white'
                      : 'border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
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
                  setCurrentPage('title');
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
            <div className="flex flex-wrap gap-2 justify-start">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSection(item.id)}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 border text-xs md:text-sm whitespace-nowrap ${
                    selectedSection === item.id
                      ? 'bg-blue-500/30 border-blue-400/60 text-white'
                      : 'border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="hidden sm:inline">{item.icon} </span>
                  <span className="text-xs">{item.title.substring(0, 8)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-6 py-6 overflow-y-auto w-full">
            {selectedSection === 'nazariy' && (
              <div className="fixed inset-0 bg-gray-950 z-50 flex flex-col">
                {/* Header */}
                <div className="bg-gray-950 border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
                  <h2 className="text-2xl font-bold text-white">📚 Nazariy Ma'lumot</h2>
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
                {/* PDF Viewer - Full Space */}
                <div className="flex-1 overflow-hidden bg-gray-900">
                  <embed src={pdfFile} type="application/pdf" className="w-full h-full" />
                </div>
              </div>
            )}

            {selectedSection === 'video' && (
              <div className="max-w-2xl w-full animate-fadeIn flex flex-col">
                <h2 className="text-4xl font-bold text-white mb-6">🎥 Video Darslik</h2>
                <div className="text-gray-300 space-y-4 bg-gray-950/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex-1 mb-6">
                  <p>Bu bo'limda Cisco 2600 haqida video darsliklar joylashadi.</p>
                  <p className="text-sm text-gray-500">Video tez orada qo'shiladi...</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedSection(null);
                    if (startAtMenu) onBack?.();
                  }}
                  className="px-4 py-2 rounded-lg font-semibold bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-white/10 transition-all duration-300 self-start"
                >
                  ← Orqaga
                </button>
              </div>
            )}

            {selectedSection === 'funksional' && (
              <div className="max-w-2xl w-full animate-fadeIn flex flex-col">
                <h2 className="text-4xl font-bold text-white mb-6">⚙️ Funksional Sxemalari</h2>
                <div className="text-gray-300 space-y-4 bg-gray-950/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex-1 mb-6">
                  <p>Bu bo'limda Cisco 2600 ning funksional sxemalari joylashadi.</p>
                  <p className="text-sm text-gray-500">Sxemalar tez orada qo'shiladi...</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedSection(null);
                    if (startAtMenu) onBack?.();
                  }}
                  className="px-4 py-2 rounded-lg font-semibold bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-white/10 transition-all duration-300 self-start"
                >
                  ← Orqaga
                </button>
              </div>
            )}

            {selectedSection === 'ishlash' && (
              <div className="max-w-2xl w-full animate-fadeIn flex flex-col">
                <h2 className="text-4xl font-bold text-white mb-6">💡 Ishlash Prinsipi</h2>
                <div className="text-gray-300 space-y-4 bg-gray-950/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex-1 mb-6">
                  <p>Bu bo'limda Cisco 2600 ning ishlash prinsipi va mexanizmi tushuntiriladi.</p>
                  <p className="text-sm text-gray-500">Ma'lumot tez orada qo'shiladi...</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedSection(null);
                    if (startAtMenu) onBack?.();
                  }}
                  className="px-4 py-2 rounded-lg font-semibold bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-white/10 transition-all duration-300 self-start"
                >
                  ← Orqaga
                </button>
              </div>
            )}

            {!selectedSection && (
              <div className="text-center">
                <p className="text-gray-400 text-lg">Menu dan bo'limni tanlang →</p>
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
