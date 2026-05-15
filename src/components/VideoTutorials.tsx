import { useState } from "react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "1",
    title: "Cisco 2600 - Qisqacha Ko'rikma",
    description:
      "Cisco 2600 router seriyasining to'liq umumiy ko'rinishi va asosiy xususiyatlari",
    url: "C4E7zfvDHyU",
    thumbnail: "https://img.youtube.com/vi/C4E7zfvDHyU/maxresdefault.jpg",
    duration: "15 daqiqa",
  },
  {
    id: "2",
    title: "Modullar va Konfiguratsiya",
    description:
      "Router modullarining o'rnatilishi va sozlanishi bo'yicha to'liq ko'rsatma",
    url: "bhjV7zoW6pk",
    thumbnail: "https://img.youtube.com/vi/bhjV7zoW6pk/maxresdefault.jpg",
    duration: "22 daqiqa",
  },
  {
    id: "3",
    title: "Orqa Panel Taxlilash",
    description:
      "Orqa panel portlari va ularning funksiyalari haqida batafsil ma'lumot",
    url: "bhjV7zoW6pk",
    thumbnail: "https://img.youtube.com/vi/bhjV7zoW6pk/maxresdefault.jpg",
    duration: "18 daqiqa",
  },
  {
    id: "4",
    title: "Yuqori Darajadagi Amallar",
    description: "Murakkab konfiguratsiya va diagnostika mexanizmlari",
    url: "bhjV7zoW6pk",
    thumbnail: "https://img.youtube.com/vi/bhjV7zoW6pk/maxresdefault.jpg",
    duration: "28 daqiqa",
  },
];

interface ModalState {
  isOpen: boolean;
  videoUrl: string;
  videoTitle: string;
}

export default function VideoTutorials() {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    videoUrl: "",
    videoTitle: "",
  });

  const openVideo = (url: string, title: string) => {
    setModal({ isOpen: true, videoUrl: url, videoTitle: title });
  };

  const closeModal = () => {
    setModal({ isOpen: false, videoUrl: "", videoTitle: "" });
  };

  return (
    <div className="w-full h-full">
      {/* Video Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full auto-rows-fr">
        {VIDEOS.map(video => (
          <div
            key={video.id}
            onClick={() => openVideo(video.url, video.title)}
            className="group cursor-pointer rounded-lg overflow-hidden bg-gray-900/40 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
          >
            {/* Thumbnail Container */}
            <div className="relative w-full pb-[56.25%] bg-black overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-red-600/80 group-hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <svg
                    className="w-5 h-5 text-white fill-white ml-1"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="5 3 19 12 5 21" />
                  </svg>
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-xs font-semibold">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                {video.title}
              </h3>
              <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                {video.description}
              </p>
              <div className="mt-3 text-[10px] text-gray-500">
                📺 Cisco 2600
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-gray-950 rounded-lg overflow-hidden max-w-4xl w-full border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gray-900/80 border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg truncate">
                {modal.videoTitle}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors text-2xl w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full pb-[56.25%] bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${modal.videoUrl}?autoplay=1`}
                title={modal.videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-900/80 border-t border-white/10 px-6 py-4">
              <button
                onClick={closeModal}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
              >
                Yopish (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
