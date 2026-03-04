import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  PlayCircle,
  CheckCircle,
  TrendingUp,
  Brain,
  GraduationCap,
  BookOpen,
  Layers,
  Star,
  Twitter,
  Github,
  Linkedin,
  ChevronDown,
  Building2,
  FileQuestion,
  Video,
  X,
  Loader2,
  Mail,
  User,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase env vars are missing");
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  textColor: string;
}

interface StepProps {
  number: string;
  title: string;
  description: string;
  color: string;
  borderColor: string;
  hasPulse?: boolean;
}

interface TestimonialProps {
  quote: string;
  initials: string;
  name: string;
  role: string;
  gradient: string;
}

// --- NEW: Video Modal Component ---
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300 border border-gray-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-md"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Player */}
        <video
          className="w-full h-full"
          controls
          autoPlay
          playsInline
          src="/Lectra_AI.mp4" // Assumes file is in public folder
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

// Waitlist Modal Component
interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from("UserWaitList")
        .insert([{ name, email, created_at: new Date().toISOString() }]);

      if (error) throw error;

      setSubmitStatus("success");
      setName("");
      setEmail("");
      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
      }, 2000);
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 transform transition-all animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Join the Waitlist
          </h3>
          <p className="text-gray-600">
            Be the first to experience AI-powered learning. We'll notify you
            when we launch!
          </p>
        </div>

        {submitStatus === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              You're on the list!
            </h4>
            <p className="text-gray-600">We'll be in touch soon.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>
            </div>

            {submitStatus === "error" && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join Waitlist"
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

// StudyForge-style Subtle Full-Screen Book
const SubtleBackgroundBook: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 flex items-center justify-center">
      {/* Container for the book - fills most of viewport */}
      <div
        className="relative w-[120vw] h-[120vh] max-w-[450px] max-h-[300px]"
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Center Spine */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-[90%] bg-gray-200 z-10" />

        {/* Left Side - Static Pages (Fanning out) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-[85%] flex items-center justify-end">
          {[...Array(12)].map((_, i) => (
            <div
              key={`left-${i}`}
              className="absolute bg-gray-50 border-r border-gray-100"
              style={{
                width: `${95 - i * 2}%`,
                height: `${82 - i * 1}%`,
                right: "0",
                transform: `rotateY(${35 + i * 3}deg) translateZ(${-i * 2}px)`,
                transformOrigin: "right center",
                opacity: 1,
                borderRadius: "0 4px 4px 0",
              }}
            >
              {/* Ruled lines */}
              <div className="w-full h-full flex flex-col justify-center gap-3.5 px-8 py-12">
                {[...Array(20)].map((_, j) => (
                  <div
                    key={j}
                    className="w-full h-px bg-gray-200"
                    style={{ opacity: 0.5 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Static Pages (Fanning out) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[85%] flex items-center justify-start">
          {[...Array(12)].map((_, i) => (
            <div
              key={`right-${i}`}
              className="absolute bg-gray-50 border-l border-gray-100"
              style={{
                width: `${95 - i * 2}%`,
                height: `${82 - i * 1}%`,
                left: "0",
                transform: `rotateY(${-35 - i * 3}deg) translateZ(${-i * 2}px)`,
                transformOrigin: "left center",
                opacity: 0.4 - i * 0.03,
                borderRadius: "4px 0 0 4px",
              }}
            >
              {/* Ruled lines */}
              <div className="w-full h-full flex flex-col justify-center gap-3.5 px-8 py-12">
                {[...Array(20)].map((_, j) => (
                  <div
                    key={j}
                    className="w-full h-px bg-gray-200"
                    style={{ opacity: 0.5 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FLIPPING PAGE - Right to Left (Main animation) */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[82%] origin-left"
          style={{
            transformStyle: "preserve-3d",
            animation: "subtlePageFlip 10s ease-in-out infinite",
          }}
        >
          {/* Front side (Right page) */}
          <div
            className="absolute inset-0 w-full h-full bg-gray-50 border-l border-gray-100"
            style={{
              backfaceVisibility: "hidden",
              borderRadius: "4px 0 0 4px",
            }}
          >
            <div className="w-full h-full flex flex-col justify-center gap-3.5 px-8 py-12">
              {[...Array(20)].map((_, j) => (
                <div
                  key={j}
                  className="w-full h-px bg-gray-200 opacity-50"
                />
              ))}
            </div>
          </div>

          {/* Back side (Left page) */}
          <div
            className="absolute inset-0 w-full h-full bg-gray-50 border-r border-gray-100"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              borderRadius: "0 4px 4px 0",
            }}
          >
            <div className="w-full h-full flex flex-col justify-center gap-3.5 px-8 py-12">
              {[...Array(20)].map((_, j) => (
                <div
                  key={j}
                  className="w-full h-px bg-gray-200 opacity-50"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Secondary flipping page (slower, offset) */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[80%] origin-left"
          style={{
            transformStyle: "preserve-3d",
            animation: "subtlePageFlip 14s ease-in-out infinite",
            animationDelay: "5s",
            opacity: 0.6,
          }}
        >
          <div
            className="absolute inset-0 w-full h-full bg-gray-100/50 border-l border-gray-200"
            style={{
              backfaceVisibility: "hidden",
              borderRadius: "4px 0 0 4px",
            }}
          >
            <div className="w-full h-full flex flex-col justify-center gap-3.5 px-8 py-12">
              {[...Array(18)].map((_, j) => (
                <div
                  key={j}
                  className="w-full h-px bg-gray-300 opacity-30"
                />
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 w-full h-full bg-gray-100/50 border-r border-gray-200"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              borderRadius: "0 4px 4px 0",
            }}
          >
            <div className="w-full h-full flex flex-col justify-center gap-3.5 px-8 py-12">
              {[...Array(18)].map((_, j) => (
                <div
                  key={j}
                  className="w-full h-px bg-gray-300 opacity-30"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Left side flip (reverse direction) */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-[81%] origin-right"
          style={{
            transformStyle: "preserve-3d",
            animation: "subtlePageFlipReverse 12s ease-in-out infinite",
            animationDelay: "2s",
          }}
        >
          <div
            className="absolute inset-0 w-full h-full bg-gray-50 border-r border-gray-100"
            style={{
              backfaceVisibility: "hidden",
              borderRadius: "0 4px 4px 0",
            }}
          >
            <div className="w-full h-full flex flex-col justify-center gap-3.5 px-8 py-12">
              {[...Array(20)].map((_, j) => (
                <div
                  key={j}
                  className="w-full h-px bg-gray-200 opacity-50"
                />
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 w-full h-full bg-gray-50 border-l border-gray-100"
            style={{
              transform: "rotateY(-180deg)",
              backfaceVisibility: "hidden",
              borderRadius: "4px 0 0 4px",
            }}
          >
            <div className="w-full h-full flex flex-col justify-center gap-3.5 px-8 py-12">
              {[...Array(20)].map((_, j) => (
                <div
                  key={j}
                  className="w-full h-px bg-gray-200 opacity-50"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color,
  textColor,
}) => (
  <div className="glass-card rounded-3xl p-8 card-hover relative overflow-hidden group">
    <div
      className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform`}
    ></div>
    <div className="relative z-10">
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} ${textColor} flex items-center justify-center mb-6`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

// --- ENHANCED STEP COMPONENT ---
const Step: React.FC<StepProps> = ({
  number,
  title,
  description,
  color,
  borderColor,
  hasPulse,
}) => (
  <div className="text-center relative group">
    {/* Step Number Container */}
    <div
      className={`w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl font-bold ${color} mb-6 border-2 ${borderColor} relative z-10 transition-transform duration-300 group-hover:scale-110`}
    >
      {number}

      {/* Blinking Pulse Effect */}
      {hasPulse && (
        <div className="absolute inset-0 rounded-2xl animate-ping opacity-75 bg-indigo-400"></div>
      )}
    </div>

    {/* Text Content */}
    <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-indigo-600">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  initials,
  name,
  role,
  gradient,
}) => (
  <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-5 h-5 text-yellow-400 fill-yellow-400"
        />
      ))}
    </div>
    <p className="text-gray-300 mb-6">{quote}</p>
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white`}
      >
        {initials}
      </div>
      <div>
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  </div>
);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  // --- NEW: State for Video Modal ---
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-5");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      el.classList.add(
        "opacity-0",
        "translate-y-5",
        "transition-all",
        "duration-700",
      );
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-gradient {
          background: radial-gradient(
            circle at 50% 50%,
            rgba(99, 102, 241, 0.08) 0%,
            rgba(255, 255, 255, 0) 50%
          );
        }
        
        /* Subtle page flip - Right to Left */
        @keyframes subtlePageFlip {
          0% {
            transform: translateY(-50%) rotateY(0deg);
          }
          40% {
            transform: translateY(-50%) rotateY(-180deg);
          }
          50% {
            transform: translateY(-50%) rotateY(-180deg);
          }
          90% {
            transform: translateY(-50%) rotateY(0deg);
          }
          100% {
            transform: translateY(-50%) rotateY(0deg);
          }
        }
        
        /* Subtle page flip - Left to Right */
        @keyframes subtlePageFlipReverse {
          0% {
            transform: translateY(-50%) rotateY(0deg);
          }
          40% {
            transform: translateY(-50%) rotateY(180deg);
          }
          50% {
            transform: translateY(-50%) rotateY(180deg);
          }
          90% {
            transform: translateY(-50%) rotateY(0deg);
          }
          100% {
            transform: translateY(-50%) rotateY(0deg);
          }
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .floating-slow {
          animation: float 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .wave-bg {
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23f3f4f6' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
          background-size: cover;
          background-position: center;
        }
        
        .pulse-ring {
          position: absolute;
          border-radius: 50%;
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-in {
          animation-duration: 0.3s;
          animation-fill-mode: both;
        }

        .fade-in {
          animation-name: fade-in;
        }

        .zoom-in {
          animation-name: zoom-in;
        }

        /* --- NEW ANIMATION FOR CONNECTING LINE --- */
        @keyframes flowLine {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        .flowing-line {
          background: linear-gradient(90deg, #e0e7ff, #c7d2fe, #e0e7ff);
          background-size: 200% 100%;
          animation: flowLine 3s linear infinite;
        }
      `}</style>

      {/* --- Render Modals --- */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      <main className="text-gray-800 antialiased bg-[#fafafa] overflow-x-hidden min-h-screen">
        {/* Navigation */}
        <nav
          className={`fixed w-full z-50 transition-all duration-300 py-4 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img className="w-7" src="src\assets\LECTRA-logo-round.png" alt="Lectra Logo" />
                <span className="font-bold text-xl tracking-tight text-gray-900">
                  Lectra
                </span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <button
                  onClick={() => scrollToSection("#features")}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("#how-it-works")}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  How it Works
                </button>
                <button
                  onClick={() => scrollToSection("#testimonials")}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Testimonials
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105 shadow-lg shadow-gray-900/20"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section with Subtle Full-Screen Book */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Subtle Full-Screen Background Book */}
          <SubtleBackgroundBook />

          {/* Very light overlay for text readability */}
          <div className="absolute inset-0 bg-white/30 pointer-events-none z-0"></div>

          {/* Floating Cards */}
          <div className="absolute top-32 left-10 md:left-20 glass-card rounded-2xl p-4 floating hidden sm:block animate-on-scroll z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Task Completed</p>
                <p className="text-sm font-semibold text-gray-900">
                  Math Assignment
                </p>
              </div>
            </div>
          </div>

          <div className="absolute top-40 right-10 md:right-20 glass-card rounded-2xl p-4 floating-delayed hidden sm:block animate-on-scroll z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Progress</p>
                <p className="text-sm font-semibold text-gray-900">
                  +24% this week
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-40 left-20 glass-card rounded-2xl p-4 floating-slow hidden lg:block animate-on-scroll z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Focus Mode</p>
                <p className="text-sm font-semibold text-gray-900">Active</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-200 shadow-sm mb-8 animate-on-scroll">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium text-gray-600">
                Join over 5,000 students that waitlisted in the first week!
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight animate-on-scroll">
              An AI <br />
              <span className="gradient-text">
                that augments how you learn not what you submit
              </span>{" "}
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-on-scroll">
              Why read to understand when you can see it to make sense?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-on-scroll">
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-xl shadow-gray-900/20 flex items-center gap-2"
              >
                Join Waitlist
                <ArrowRight className="w-5 h-5" />
              </button>
              {/* --- UPDATED: Watch Demo Button --- */}
              <button
                onClick={() => setIsVideoOpen(true)}
                className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-full font-semibold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </section>

        {/* Who It's For Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Who Lectra Helps
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tailored learning experiences for every type of learners
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="animate-on-scroll">
                <FeatureCard
                  icon={<GraduationCap className="w-7 h-7" />}
                  title="High School Students"
                  description="Ace your exams with personalized study schedules, practice tests, and AI tutoring that adapts to your learning pace."
                  color="from-blue-100 to-purple-100"
                  textColor="text-blue-600"
                />
              </div>
              <div className="animate-on-scroll">
                <FeatureCard
                  icon={<BookOpen className="w-7 h-7" />}
                  title="College Students"
                  description="Manage complex coursework with collaborative study groups, citation tools, and deep learning analytics for better retention."
                  color="from-purple-100 to-pink-100"
                  textColor="text-purple-600"
                />
              </div>
              <div className="animate-on-scroll">
                <FeatureCard
                  icon={<Building2 className="w-7 h-7" />}
                  title="Educational Institutions"
                  description="Empower your institution with admin dashboards, curriculum management, student progress tracking, and collaborative learning environments."
                  color="from-green-100 to-teal-100"
                  textColor="text-green-600"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-24 bg-gray-50 relative overflow-hidden"
        >
          <div className="absolute inset-0 wave-bg opacity-30"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                Simple but Everything You Need to Excel
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Powerful tools designed to optimize your study sessions and
                maximize retention
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 animate-on-scroll">
                <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Smart Flashcards
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  AI-powered flashcards with spaced repetition that adapt to
                  your learning pace, ensuring you review content at the optimal
                  time for maximum retention.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 animate-on-scroll">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <FileQuestion className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Assessment Mode
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Auto-generates personalized questions and answers based on
                  your learning material to test comprehension and identify
                  knowledge gaps.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 animate-on-scroll">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  AI Concept Video Tutor
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Transform complex topics into engaging whiteboard videos with
                  AI-generated visual explanations, narrated walkthroughs, and
                  step-by-step breakdowns.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="py-24 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How Lectra Works
              </h2>
              <p className="text-gray-600">
                Three simple steps to transform your learning
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-10 left-0 w-full h-1 -z-0 px-20">
                <div className="w-full h-full flowing-line rounded-full opacity-60"></div>
              </div>

              <div className="animate-on-scroll">
                <Step
                  number="1"
                  title="Feed Your Material"
                  description="Upload your slides or notes and Lectra turns overwhelming lectures into clear, high-yield summaries—highlighting the key concepts, relationships, and exam priorities so you know exactly what to study."
                  color="text-indigo-600"
                  borderColor="border-indigo-100"
                  hasPulse={true}
                />
              </div>
              <div className="animate-on-scroll">
                <Step
                  number="2"
                  title="Visualize & Understand"
                  description="Instead of forcing you to reread dense material, Lectra converts complex topics into visual explanations like concept maps, step-by-step processes, and comparisons that make ideas easier to understand and remember."
                  color="text-purple-600"
                  borderColor="border-purple-100"
                />
              </div>
              <div className="animate-on-scroll">
                <Step
                  number="3"
                  title="Learn & Improve"
                  description="Then it tests your understanding with AI-generated quizzes, flashcards, and guided explanations—helping you think, recall, and master the content on your own without relying on AI to do the work for you."
                  color="text-pink-600"
                  borderColor="border-pink-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="py-24 bg-gray-900 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2)_0%,transparent_50%)]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                First User Experiences
              </h2>
              <p className="text-gray-400">See how Lectra is changing lives</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="animate-on-scroll">
                <Testimonial
                  quote="Lectra helped me go from a C student to straight A's. The AI planner knows exactly when I need to review material."
                  initials="JM"
                  name="Jessica M."
                  role="Biology Major"
                  gradient="from-indigo-400 to-purple-400"
                />
              </div>
              <div className="animate-on-scroll">
                <Testimonial
                  quote="The flashcard system is incredible. I retained more in 2 weeks than I did in a whole semester of traditional studying."
                  initials="AK"
                  name="Alex K."
                  role="Computer Science"
                  gradient="from-blue-400 to-cyan-400"
                />
              </div>
              <div className="animate-on-scroll">
                <Testimonial
                  quote="Finally, a study app that actually understands how I learn. The focus mode alone is worth the subscription."
                  initials="SR"
                  name="Sarah R."
                  role="Law Student"
                  gradient="from-pink-400 to-rose-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-slate-900 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-lg text-gray-900">
                    Lectra
                  </span>
                </div>
                <p className="text-gray-600 mb-4 max-w-sm">
                  Empowering students worldwide with AI-driven learning tools
                  and personalized education experiences.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                © 2026 Lectra. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-gray-500">
                <a
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
