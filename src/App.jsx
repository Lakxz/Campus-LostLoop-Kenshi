import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  MapPin,
  Menu,
  Moon,
  Package,
  Search,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

/* =========================================================
   LOGO
========================================================= */

function Logo() {
  return (
    <motion.div
      whileHover={{ opacity: 0.75 }}
      transition={{ duration: 0.2 }}
      className="flex items-center"
    >
      <span className="font-[Sora] text-[19px] font-semibold tracking-[-0.05em] text-slate-950 dark:text-white">
        campus
      </span>

      <span className="font-[Sora] text-[19px] font-semibold tracking-[-0.05em] text-blue-600 dark:text-blue-400">
        .lostloop
      </span>
    </motion.div>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [page, setPage] = useState("home");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("campus-lostloop-theme") || "dark";
  });

  const [mobileMenu, setMobileMenu] = useState(false);
  const [notification, setNotification] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const [lostItems, setLostItems] = useState([
    {
      id: 1,
      name: "Black Wallet",
      category: "Personal",
      location: "Central Library",
      date: "Today",
      status: "Searching",
    },
    {
      id: 2,
      name: "AirPods Pro",
      category: "Electronics",
      location: "CSE Block",
      date: "Yesterday",
      status: "Searching",
    },
    {
      id: 3,
      name: "Student ID Card",
      category: "Documents",
      location: "Admin Block",
      date: "2 days ago",
      status: "Searching",
    },
  ]);

  const [foundItems, setFoundItems] = useState([
    {
      id: 1,
      name: "Blue Water Bottle",
      category: "Other",
      location: "Main Ground",
      date: "Today",
      status: "Owner not found",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
  });

  /* =======================================================
     THEME
  ======================================================= */

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    localStorage.setItem(
      "campus-lostloop-theme",
      nextTheme
    );
  }

  /* =======================================================
     NAVIGATION
  ======================================================= */

  function navigate(nextPage) {
    setPage(nextPage);
    setMobileMenu(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =======================================================
     NOTIFICATIONS
  ======================================================= */

  function showNotification(message) {
    setNotification(message);

    window.setTimeout(() => {
      setNotification("");
    }, 3000);
  }

  /* =======================================================
     FORM
  ======================================================= */

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm({
      name: "",
      category: "",
      location: "",
      description: "",
    });
  }

  function submitLost(event) {
    event.preventDefault();

    if (!form.name || !form.category || !form.location) {
      showNotification(
        "Please complete all required fields."
      );
      return;
    }

    const newItem = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      location: form.location,
      date: "Just now",
      status: "Searching",
    };

    setLostItems((current) => [
      ...current,
      newItem,
    ]);

    resetForm();

    showNotification(
      "Your lost report has been published."
    );

    window.setTimeout(() => {
      navigate("activity");
    }, 700);
  }

  function submitFound(event) {
    event.preventDefault();

    if (!form.name || !form.category || !form.location) {
      showNotification(
        "Please complete all required fields."
      );
      return;
    }

    const newItem = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      location: form.location,
      date: "Just now",
      status: "Owner not found",
    };

    setFoundItems((current) => [
      ...current,
      newItem,
    ]);

    setAnalyzing(true);

    window.setTimeout(() => {
      setAnalyzing(false);
      resetForm();
      navigate("matches");
    }, 2200);
  }

  /* =======================================================
     PAGE ROUTING
  ======================================================= */

  function renderPage() {
    if (page === "home") {
      return (
        <Home
          lostItems={lostItems}
          foundItems={foundItems}
          navigate={navigate}
        />
      );
    }

    if (page === "lost") {
      return (
        <ReportForm
          type="lost"
          title="Report something lost."
          description="Tell your campus community what went missing."
          buttonText="Publish lost report"
          buttonClass="bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          form={form}
          handleChange={handleChange}
          onSubmit={submitLost}
        />
      );
    }

    if (page === "found") {
      return (
        <ReportForm
          type="found"
          title="Report something found."
          description="You might be the reason someone gets their belongings back."
          buttonText={
            analyzing
              ? "Finding possible matches..."
              : "Analyze potential matches"
          }
          buttonClass="bg-blue-600 text-white hover:bg-blue-500"
          form={form}
          handleChange={handleChange}
          onSubmit={submitFound}
          analyzing={analyzing}
        />
      );
    }

    if (page === "matches") {
      return (
        <Matches
          foundItems={foundItems}
          showNotification={showNotification}
        />
      );
    }

    if (page === "activity") {
      return (
        <Activity
          lostItems={lostItems}
          foundItems={foundItems}
        />
      );
    }

    return null;
  }

  return (
    <div
      className={
        theme === "dark"
          ? "dark min-h-screen bg-[#050505] text-white transition-colors duration-500"
          : "min-h-screen bg-[#f8fafc] text-slate-950 transition-colors duration-500"
      }
    >
      <Background />

      <Navbar
        page={page}
        navigate={navigate}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.28,
              ease: "easeOut",
            }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <AnimatePresence>
        {notification && (
          <Toast message={notification} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{
          opacity: [0.08, 0.16, 0.08],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-180px] top-[-180px] h-[450px] w-[450px] rounded-full bg-blue-500/20 blur-[130px] dark:bg-blue-600/10"
      />

      <motion.div
        animate={{
          opacity: [0.04, 0.1, 0.04],
          x: [0, -40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-180px] top-[35%] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[140px]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]" />
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({
  page,
  navigate,
  mobileMenu,
  setMobileMenu,
  theme,
  toggleTheme,
}) {
  const links = [
    ["home", "Home"],
    ["lost", "Report Lost"],
    ["found", "Report Found"],
    ["matches", "Matches"],
    ["activity", "Activity"],
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#050505]/80">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("home")}
          className="text-left"
        >
          <Logo />
        </motion.button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map(([value, label]) => (
            <NavButton
              key={value}
              active={page === value}
              onClick={() => navigate(value)}
            >
              {label}
            </NavButton>
          ))}

          <div className="ml-2 border-l border-slate-200 pl-3 dark:border-white/[0.08]">
            <ThemeToggle
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle
            theme={theme}
            toggleTheme={toggleTheme}
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            {mobileMenu ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="overflow-hidden border-t border-slate-200 dark:border-white/[0.06] md:hidden"
          >
            <div className="space-y-1 p-4">
              {links.map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => navigate(value)}
                  className={`block w-full rounded-lg px-4 py-3 text-left text-sm transition ${
                    page === value
                      ? "bg-slate-100 text-slate-950 dark:bg-white/[0.07] dark:text-white"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* =========================================================
   NAV BUTTON
========================================================= */

function NavButton({
  active,
  children,
  onClick,
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm transition ${
        active
          ? "bg-slate-100 text-slate-950 dark:bg-white/[0.08] dark:text-white"
          : "text-slate-500 hover:text-slate-950 dark:text-slate-500 dark:hover:text-white"
      }`}
    >
      {children}
    </motion.button>
  );
}

/* =========================================================
   THEME TOGGLE
========================================================= */

function ThemeToggle({
  theme,
  toggleTheme,
}) {
  const dark = theme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative flex h-9 w-[66px] items-center rounded-full border p-1 transition-colors duration-300 ${
        dark
          ? "border-white/10 bg-white/[0.06]"
          : "border-slate-200 bg-slate-100"
      }`}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={`flex h-7 w-7 items-center justify-center rounded-full shadow-sm ${
          dark
            ? "bg-slate-800 text-blue-400"
            : "bg-white text-amber-500"
        }`}
      >
        {dark ? (
          <Moon size={14} />
        ) : (
          <Sun size={15} />
        )}
      </motion.div>

      <span
        className={`absolute text-[8px] font-bold uppercase tracking-wider ${
          dark
            ? "right-2 text-slate-600"
            : "right-2 text-slate-400"
        }`}
      >
        {dark ? "Dark" : "Light"}
      </span>
    </motion.button>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home({
  lostItems,
  foundItems,
  navigate,
}) {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-32">
        <div className="max-w-5xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-7 bg-blue-500 dark:bg-blue-400" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400 sm:text-xs">
                Campus lost & found
              </span>
            </div>

            <h1 className="font-[Sora] text-4xl font-semibold leading-[1.05] tracking-[-0.06em] text-slate-950 sm:text-5xl md:text-7xl lg:text-8xl dark:text-white">
              Lost something?
              <span className="block text-slate-400 dark:text-slate-500">
                Let&apos;s get it back.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-slate-500 sm:text-base md:text-lg md:leading-8 dark:text-slate-500">
              A smarter way for students to report,
              discover, and return lost belongings across
              campus.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => navigate("lost")}
                className="group flex items-center justify-center gap-3 rounded-lg bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Report something lost

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.button>

              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => navigate("found")}
                className="rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-white/10 dark:bg-transparent dark:text-white dark:hover:bg-white/5"
              >
                I found something
              </motion.button>
            </div>
          </motion.div>
        </div>

        <DashboardPreview
          lostCount={lostItems.length}
          foundCount={foundItems.length}
        />
      </section>

      <section className="border-y border-slate-200 dark:border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-600 sm:text-xs">
                Live campus activity
              </p>

              <h2 className="mt-3 font-[Sora] text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl dark:text-white">
                Recent reports
              </h2>
            </div>

            <button
              onClick={() => navigate("activity")}
              className="hidden items-center gap-2 text-sm text-slate-500 transition hover:text-slate-950 sm:flex dark:hover:text-white"
            >
              View activity
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-3 dark:border-white/[0.06] dark:bg-white/[0.06]">
            {lostItems.slice(-3).map((item, index) => (
              <ActivityCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   DASHBOARD PREVIEW
========================================================= */

function DashboardPreview({
  lostCount,
  foundCount,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.25,
        duration: 0.7,
      }}
      className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:mt-20 lg:grid-cols-[1.4fr_0.6fr] dark:border-white/[0.07] dark:bg-white/[0.07]"
    >
      <div className="bg-white p-5 sm:p-7 dark:bg-[#0a0a0a]">
        <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/[0.06]">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Campus overview
            </p>

            <p className="mt-1 text-xs text-slate-400 dark:text-slate-600">
              Updated just now
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <PreviewStat
            value={lostCount}
            label="Lost reports"
          />

          <PreviewStat
            value={foundCount}
            label="Found reports"
          />

          <PreviewStat
            value="94%"
            label="Top match"
          />

          <PreviewStat
            value="24h"
            label="Avg. response"
          />
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 dark:text-slate-600">
              Community recovery activity
            </span>

            <span className="text-[11px] text-slate-400 dark:text-slate-600">
              This week
            </span>
          </div>

          <div className="flex h-24 items-end gap-1.5 sm:h-28 sm:gap-2">
            {[
              35,
              52,
              44,
              68,
              58,
              82,
              72,
              94,
              76,
              88,
              64,
              98,
            ].map((height, index) => (
              <motion.div
                key={index}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: `${height}%`,
                }}
                transition={{
                  delay: 0.5 + index * 0.04,
                  duration: 0.6,
                }}
                className={`flex-1 rounded-sm ${
                  index === 11
                    ? "bg-blue-500 dark:bg-blue-400"
                    : "bg-slate-200 dark:bg-white/[0.08]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-5 sm:p-7 dark:bg-[#080808]">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.03]">
              <Search
                size={18}
                className="text-blue-500 dark:text-blue-400"
              />
            </div>

            <h3 className="mt-6 font-[Sora] text-xl font-medium tracking-[-0.03em] text-slate-950 dark:text-white">
              Smart matching
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-600">
              Connect found items with existing lost
              reports using category, location, and time
              signals.
            </p>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-5 dark:border-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 dark:text-slate-600">
                Matching engine
              </span>

              <span className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PreviewStat({
  value,
  label,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/[0.06] dark:bg-black/20"
    >
      <p className="font-[Sora] text-xl font-semibold text-slate-950 dark:text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-600">
        {label}
      </p>
    </motion.div>
  );
}

/* =========================================================
   ACTIVITY CARD
========================================================= */

function ActivityCard({
  item,
  index,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.08,
      }}
      whileHover={{
        backgroundColor:
          "rgba(128,128,128,0.035)",
      }}
      className="bg-white p-5 sm:p-6 dark:bg-[#080808]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-white/[0.07] dark:bg-white/[0.02]">
          <Package
            size={17}
            className="text-slate-500 dark:text-slate-400"
          />
        </div>

        <span className="text-[11px] text-slate-400 dark:text-slate-600">
          {item.date}
        </span>
      </div>

      <h3 className="mt-6 text-sm font-semibold text-slate-900 dark:text-white">
        {item.name}
      </h3>

      <p className="mt-1 text-xs text-slate-400 dark:text-slate-600">
        {item.category}
      </p>

      <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
        <MapPin size={13} />
        {item.location}
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-slate-200 pt-4 text-[11px] text-red-500 dark:border-white/[0.06] dark:text-red-400">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        {item.status}
      </div>
    </motion.div>
  );
}

/* =========================================================
   REPORT FORM
========================================================= */

function ReportForm({
  type,
  title,
  description,
  buttonText,
  buttonClass,
  form,
  handleChange,
  onSubmit,
  analyzing,
}) {
  const isLost = type === "lost";

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 md:py-28">
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className={`h-px w-8 ${
              isLost
                ? "bg-blue-500 dark:bg-blue-400"
                : "bg-emerald-500 dark:bg-emerald-400"
            }`}
          />

          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.25em] sm:text-xs ${
              isLost
                ? "text-blue-600 dark:text-blue-400"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {isLost
              ? "Lost report"
              : "Found report"}
          </span>
        </div>

        <h1 className="mt-6 font-[Sora] text-3xl font-semibold leading-tight tracking-[-0.05em] text-slate-950 sm:text-4xl md:text-6xl dark:text-white">
          {title}
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          {description}
        </p>
      </motion.div>

      <motion.form
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
        }}
        onSubmit={onSubmit}
        className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/[0.07] dark:bg-white/[0.025]"
      >
        <div className="border-b border-slate-200 px-5 py-5 sm:px-8 dark:border-white/[0.06]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
            Item details
          </p>
        </div>

        <div className="space-y-6 p-5 sm:p-8">
          <Input
            label="Item name"
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Black leather wallet"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Category
              <span className="ml-1 text-blue-500">*</span>
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500/60 dark:border-white/[0.08] dark:bg-[#080808] dark:text-white"
            >
              <option value="">
                Select a category
              </option>
              <option>Electronics</option>
              <option>Personal</option>
              <option>Books</option>
              <option>Documents</option>
              <option>Clothing</option>
              <option>Accessories</option>
              <option>Other</option>
            </select>
          </div>

          <Input
            label={
              isLost
                ? "Where did you lose it?"
                : "Where did you find it?"
            }
            required
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Central Library"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Add identifying details, colors, marks, or anything that could help..."
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500/60 dark:border-white/[0.08] dark:bg-[#080808] dark:text-white dark:placeholder:text-slate-700"
            />
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 p-5 sm:px-8 dark:border-white/[0.06] dark:bg-white/[0.015]">
          <motion.button
            whileHover={{
              y: -1,
            }}
            whileTap={{
              scale: 0.98,
            }}
            disabled={analyzing}
            type="submit"
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${buttonClass}`}
          >
            {analyzing ? (
              <>
                <motion.span
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                />

                {buttonText}
              </>
            ) : (
              <>
                {isLost ? (
                  <FileText size={16} />
                ) : (
                  <Sparkles size={16} />
                )}

                {buttonText}

                <ArrowRight size={16} />
              </>
            )}
          </motion.button>
        </div>
      </motion.form>
    </section>
  );
}

/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  required,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}

        {required && (
          <span className="ml-1 text-blue-500">
            *
          </span>
        )}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500/60 dark:border-white/[0.08] dark:bg-[#080808] dark:text-white dark:placeholder:text-slate-700"
      />
    </div>
  );
}

/* =========================================================
   MATCHES
========================================================= */

function Matches({
  foundItems,
  showNotification,
}) {
  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 sm:px-6 md:py-28">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-600 sm:text-xs dark:text-emerald-400">
            Potential matches
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl font-[Sora] text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl md:text-6xl dark:text-white">
          Something looks familiar.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          Our demo matching system compares item
          category, location, and other report signals.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {foundItems.map((item, index) => (
          <MatchCard
            key={item.id}
            item={item}
            index={index}
            showNotification={showNotification}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   MATCH CARD
========================================================= */

function MatchCard({
  item,
  index,
  showNotification,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.1,
      }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/[0.07] dark:bg-white/[0.025]"
    >
      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
        <div className="flex min-h-[220px] items-center justify-center bg-gradient-to-br from-blue-500/10 to-transparent p-8 md:min-h-[300px]">
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
              duration: 0.5,
            }}
            className="flex h-28 w-28 items-center justify-center rounded-2xl border border-slate-200 bg-white/70 dark:border-white/[0.08] dark:bg-white/[0.04]"
          >
            <Package
              size={42}
              strokeWidth={1.3}
              className="text-slate-400"
            />
          </motion.div>
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-600">
                Possible match
              </p>

              <h2 className="mt-2 font-[Sora] text-lg font-medium tracking-[-0.03em] text-slate-950 sm:text-xl dark:text-white">
                {item.name}
              </h2>
            </div>

            <div className="text-right">
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="text-2xl font-semibold text-emerald-500 dark:text-emerald-400"
              >
                94%
              </motion.p>

              <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-600">
                confidence
              </p>
            </div>
          </div>

          <div className="mt-6 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: "94%",
              }}
              transition={{
                delay: 0.3,
                duration: 1,
              }}
              className="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
            />
          </div>

          <div className="mt-6 space-y-3">
            <MatchSignal>
              Category matches
            </MatchSignal>

            <MatchSignal>
              Location is nearby
            </MatchSignal>

            <MatchSignal>
              Report timing is similar
            </MatchSignal>
          </div>

          <button
            onClick={() =>
              showNotification(
                "Owner notification sent successfully."
              )
            }
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            <Bell size={16} />
            Notify owner
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   MATCH SIGNAL
========================================================= */

function MatchSignal({ children }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-500">
      <CheckCircle2
        size={16}
        className="text-emerald-500 dark:text-emerald-400"
      />

      {children}
    </div>
  );
}

/* =========================================================
   ACTIVITY
========================================================= */

function Activity({
  lostItems,
  foundItems,
}) {
  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 sm:px-6 md:py-28">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-blue-500 dark:bg-blue-400" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-600 sm:text-xs dark:text-blue-400">
            Your activity
          </span>
        </div>

        <h1 className="mt-6 font-[Sora] text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl md:text-6xl dark:text-white">
          Your reports.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          Keep track of everything you&apos;ve reported
          on campus.
        </p>
      </div>

      <div className="mt-12">
        <SectionHeading
          title="Lost items"
          count={lostItems.length}
        />

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.07]">
          {lostItems.map((item, index) => (
            <ActivityRow
              key={item.id}
              item={item}
              type="lost"
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <SectionHeading
          title="Found items"
          count={foundItems.length}
        />

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.07]">
          {foundItems.map((item, index) => (
            <ActivityRow
              key={item.id}
              item={item}
              type="found"
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  title,
  count,
}) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="font-[Sora] text-lg font-medium text-slate-900 dark:text-white">
        {title}
      </h2>

      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-white/[0.06] dark:text-slate-500">
        {count}
      </span>
    </div>
  );
}

/* =========================================================
   ACTIVITY ROW
========================================================= */

function ActivityRow({
  item,
  type,
  index,
}) {
  const isLost = type === "lost";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -10,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.05,
      }}
      className="grid gap-4 border-b border-slate-200 bg-white p-5 last:border-b-0 hover:bg-slate-50 md:grid-cols-[1fr_0.7fr_0.7fr_0.5fr] md:items-center dark:border-white/[0.06] dark:bg-[#080808] dark:hover:bg-white/[0.02]"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-white/[0.07] dark:bg-white/[0.02]">
          {isLost ? (
            <Search
              size={17}
              className="text-blue-500 dark:text-blue-400"
            />
          ) : (
            <Package
              size={17}
              className="text-emerald-500 dark:text-emerald-400"
            />
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {item.name}
          </p>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-600">
            {item.category}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <MapPin size={14} />
        {item.location}
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Clock3 size={14} />
        {item.date}
      </div>

      <div>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            isLost
              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {item.status}
        </span>
      </div>
    </motion.div>
  );
}

/* =========================================================
   TOAST
========================================================= */

function Toast({ message }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 20,
        scale: 0.96,
      }}
      className="fixed bottom-5 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2"
    >
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 shadow-2xl dark:border-white/[0.08] dark:bg-[#111]/95 dark:text-white">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
          <Check
            size={14}
            className="text-emerald-500 dark:text-emerald-400"
          />
        </span>

        <span>{message}</span>
      </div>
    </motion.div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.06]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-9 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Logo />

        <p className="text-xs text-slate-400 dark:text-slate-600">
          Lost. Found. Reconnected.
        </p>

        <p className="text-xs text-slate-400 dark:text-slate-700">
          Campus LostLoop © 2026
        </p>
      </div>
    </footer>
  );
}

export default App;