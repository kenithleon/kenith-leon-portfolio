// pages/CertificatesPage.jsx
import React from "react";

const certificates = [
  { file: "/certificate/031.pdf", image: "/certificate/031_page-0001.jpg" },
  { file: "/certificate/Kenith Leon Bernard 4MT23MC031.pdf", image: "/certificate/Kenith Leon Bernard 4MT23MC031_page-0001.jpg" },
  { file: "/certificate/hackathon.jpg", image: "/certificate/hackathon.jpg" },
  { file: "/certificate/Chipsy Certificate.pdf", image: "/certificate/Chipsy Certificate.webp" },
  { file: "/certificate/frontend_developer_react certificate.pdf", image: "/certificate/frontend_developer_react certificate.webp" },
  { file: "/certificate/hzmoNKtzvAzXsEqx8_Accenture North America_YTTjLceSK7M2Kywon_1725379978253_completion_certificate (1).pdf", image: "/certificate/hzmoNKtzvAzXsEqx8_Accenture North America_YTTjLceSK7M2Kywon_1725379978253_completion_certificate (1)_page-0001.jpg" },
  { file: "/certificate/aiml.jpg", image: "/certificate/aiml.jpg" },
];

const CertificatesPage = () => (
  <section className="min-h-screen bg-black text-white py-16 px-6">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-cyan-400 mb-12 text-center">
        All Certificates
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, i) => (
          <a
            key={i}
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-cyan-500/50">
              {/* object-contain prevents crop and keeps full certificate visible */}
              <img
                src={cert.image}
                alt={`Certificate ${i + 1}`}
                className="w-full h-80 object-contain bg-black"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default CertificatesPage;
