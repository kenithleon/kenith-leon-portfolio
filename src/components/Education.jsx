import React, { useState, useEffect } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

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
      <section
        id="contact"
        className="relative py-6 lg:pt-32 lg:py-12 z-30" /* reduced vertical padding, removed mt */
      >
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-center text-white "
        >
          Contact
        </motion.h1>

        {/* Container: centered and compact */}
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
          {/* LEFT SIDE — IMAGE (limited height so it won't push things down) */}
          <div className="w-full lg:w-1/2 flex justify-center items-center lg:pr-28">
            <img
              src="/images/about.png"
              alt="Developer Illustration"
              className="w-[370px] sm:w-[420px] lg:w-[650px] object-contain drop-shadow-2xl select-none max-h-[60vh]"
            />
          </div>

          {/* RIGHT SIDE — BIGGER SQUARE CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-[480px] bg-white/8 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-8 sm:py-10 shadow-2xl hover:shadow-blue-500/20 transition-shadow flex flex-col justify-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Open to Work
            </h2>

            <p className="text-gray-300 text-base leading-relaxed mb-6">
              I’m a passionate developer eager to bring my skills to a dynamic team.
              If you’re looking for a dedicated and creative mind, let's connect!
            </p>

            <div className="mt-2">
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold py-3 px-5 rounded-lg hover:opacity-95 transition"
              >
                <HiOutlineMail className="text-lg" />
                Send a Message
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative bg-white/8 backdrop-blur-lg border border-white/10 shadow-2xl w-full max-w-lg p-5 sm:p-6 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-gray-300 hover:text-white text-2xl"
              >
                <IoClose />
              </button>

              <motion.h3
                className="text-xl sm:text-2xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38 }}
              >
                Contact Me
              </motion.h3>

              {isSent ? (
                <p className="text-green-400 font-semibold">
                  ✅ Message sent successfully!
                </p>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-black/40 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-black/40 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      className="w-full bg-black/40 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold py-3 rounded-lg"
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
