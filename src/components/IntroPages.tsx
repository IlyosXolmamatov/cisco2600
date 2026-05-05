import { useState } from "react";

interface IntroPagesProps {
  onComplete: () => void;
}

const pages = [
  {
    title: "Cisco 2621 Router Tizimi",
    content:
      "Salom! Bu Cisco 2621 Enterprise routerni 3D modelida xushkeldi. Bu router 1990-yillarning oxiri va 2000-yillarning boshida kichik va o'rta hajmdagi tarmoq uchun eng mashxur qurilmalardan biri edi.",
    subtitle: "Kirish",
  },
  {
    title: "Texnik Xususiyatlari",
    content:
      "Cisco 2621 quyidagi xususiyatlari bilan jihozlangan edi:\n\n• Motorola MPC860 protsessori @ 50MHz\n• Gacha 64MB RAM xotirasi\n• 2 ta WAN Interface Card (WIC) uyasi\n• 1-2 ta Network Module uyasi\n• IDE HDD qo'llab-quvvatlash\n• Professional harorat boshqaruvi tizimi",
    subtitle: "Texnika",
  },
  {
    title: "3D Modeli",
    content:
      "Ushbu professional 3D modelda siz:\n\n• Ichki qismidagi barcha komponentlarni ko'rish mumkin\n• Har bir komponentni tanlash va tafsilotlarini ko'rish mumkin\n• Qopqoqni ochib ichkarisini ko'rish mumkin\n• Komponentlarni ajratib (Parchalash) ko'rish mumkin\n\nKeyingida 3D routerni interaktiv tasvir qilish imkoniyatiga ega bo'lasiz!",
    subtitle: "Taqdim",
  },
];

export default function IntroPages({ onComplete }: IntroPagesProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const page = pages[currentPage];
  const progress = ((currentPage + 1) / pages.length) * 100;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4">
            <span className="text-blue-300 text-sm font-mono tracking-wide">
              {currentPage + 1} / {pages.length}
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            {page.title}
          </h1>
          <p className="text-blue-400 text-lg font-light">{page.subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 h-1 bg-gray-800/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="mb-12 p-8 bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">
            {page.content}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center items-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentPage === 0
                ? "bg-gray-800/30 text-gray-600 cursor-not-allowed"
                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-white/10"
            }`}
          >
            ← Oldingi
          </button>

          <div className="flex gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "bg-blue-500 w-8"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 border border-blue-400/30"
          >
            {currentPage === pages.length - 1 ? "Boshlash →" : "Keyingi →"}
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="mt-8 text-center text-gray-500 text-sm">
          O'ng-chap strelkalardan foydalanish mumkin
        </p>
      </div>

      {/* Keyboard navigation */}
      {typeof window !== "undefined" && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('keydown', (e) => {
                // This will be handled by the component's onKeyDown if added
              })
            `,
          }}
        />
      )}
    </div>
  );
}
