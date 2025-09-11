import React, { useState, useEffect, Suspense } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Lazy load Spline for better performance
const Spline = React.lazy(() => import("@splinetool/react-spline"));

// =================== CONFIG ===================
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe9U1sK-dNPUwdptxZOskHE4pVE-9TOuq7WC5txKvl0zBYsDQ/formResponse";

const GOOGLE_FORM_FIELDS = {
  name: "entry.380710581",
  email: "entry.1146563679",
  message: "entry.970471895",
};
// ===============================================

const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Intersection observer for Spline
  const { ref: splineRef, inView: splineInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSent(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const payload = new URLSearchParams();

    payload.append(GOOGLE_FORM_FIELDS.name, formData.get("name"));
    payload.append(GOOGLE_FORM_FIELDS.email, formData.get("email"));
    payload.append(GOOGLE_FORM_FIELDS.message, formData.get("message"));

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        body: payload,
        mode: "no-cors",
      });

      setIsSent(true);
      e.target.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && handleCloseModal();
    if (isModalOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  return (
    <>
      <section id="contact" className="relative py-20 lg:py-32 overflow-hidden z-30">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-bold text-center text-white mb-24"
        >
          Contact
        </motion.h1>

        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          {/* 3D Model */}
          <motion.div
            ref={splineRef}
            initial={{ opacity: 0, x: -50 }}
            animate={splineInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-[600px] h-[300px] md:w-[800px] md:h-[600px] flex justify-center items-center pb-12 brightness-200"
          >
            {splineInView && (
              
                <div className="relative w-full h-[600px] max-w-[900px] scale-[.62] md:scale-110 brightness-150">
                  <Spline scene="https://prod.spline.design/6P1YosPN3KBSAPDL/scene.splinecode" />
                </div>
              
            )}
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 sm:p-10 shadow-2xl hover:shadow-blue-500/20 transition-shadow mt-12 lg:mt-0"
          >
            <h2 className="text-3xl font-bold text-white">Open to Work</h2>
            <p className="text-gray-300 mt-3 mb-8">
              I’m a passionate developer eager to bring my skills to a dynamic team.
              If you’re looking for a dedicated and creative mind, let’s connect!
            </p>
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition"
            >
              <HiOutlineMail className="text-xl" />
              Send a Message
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-30"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl w-full max-w-lg p-6 sm:p-8 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              >
                <IoClose />
              </button>

              <motion.h3
                className="text-2xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Contact Me
              </motion.h3>

              {isSent ? (
                <p className="text-green-400 font-semibold">
                  ✅ Message sent successfully!
                </p>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-black/40 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-black/40 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      className="w-full bg-black/40 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold py-3 rounded-lg hover:opacity-90 transition"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactSection;
