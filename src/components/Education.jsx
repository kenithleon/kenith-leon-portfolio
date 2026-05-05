import React, { useState, useEffect } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

// ================= CONFIG =================
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe9U1sK-dNPUwdptxZOskHE4pVE-9TOuq7WC5txKvl0zBYsDQ/formResponse";

const GOOGLE_FORM_FIELDS = {
  name: "entry.380710581",
  email: "entry.1146563679",
  message: "entry.970471895",
};
// ==========================================

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
      console.error(error);
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
      <section id="contact" className="relative py-16 px-4 bg-black text-white ">
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-12 z-50"
        >
          Contact
          <span className="block w-24 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-3 z-50"></span>
        </motion.h1>

        {/* MAIN GRID */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center z-50">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex justify-center z-50"
          >
            <img
              src="/images/about.png"
              alt="contact"
              className="w-[300px] sm:w-[400px] lg:w-[520px] object-contain drop-shadow-2xl z-50"
            />
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl z-50"
          >
            <h2 className="text-3xl font-bold mb-4 z-50">
              Let’s Work Together 🚀
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed z-50">
              I'm open to internships, freelance work, and full-time roles.
              If you have a project or opportunity, feel free to reach out!
            </p>

            <button
              onClick={handleOpenModal}
              className="w-full flex items-center  z-50 justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold py-3 rounded-lg hover:scale-105 transition-transform"
            >
              <HiOutlineMail />
              Contact Me
            </button>
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-xl"
              >
                <IoClose />
              </button>

              <h3 className="text-2xl font-bold mb-4">Send Message</h3>

              {isSent ? (
                <p className="text-green-400">✅ Message sent!</p>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-blue-500"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-blue-500"
                  />

                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Your Message"
                    required
                    className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-black py-3 rounded-lg font-semibold"
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