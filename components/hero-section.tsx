"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import AnimatedBackground from "@/components/animated-background"

interface HeroSectionProps {
  onPlanTypeChange: (type: "software" | "service") => void
  onBillingTypeChange: (type: "monthly" | "yearly" | "lifetime") => void
  planType: "software" | "service"
  billingType: "monthly" | "yearly" | "lifetime"
}

export default function HeroSection({
  onPlanTypeChange,
  onBillingTypeChange,
  planType,
  billingType,
}: HeroSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#f9f7fe]" ref={ref}>
      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={badgeVariants} className="inline-block mb-6">
            <div className="px-4 py-2 bg-purple-100 text-purple-600 text-xs font-medium rounded-full shadow-sm">
              IT&apos;S A MATCH
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-600"
          >
            We&apos;ve Got A Plan That&apos;s Perfect For You
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs and start creating stunning ads in minutes with QuickAds.
          </motion.p>

          {/* Plan Type Toggle */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex bg-white p-2 rounded-full shadow-md">
              <Button
                variant="ghost"
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  planType === "software" ? "bg-purple-600 text-white shadow-sm" : "text-gray-600 hover:text-purple-600"
                }`}
                onClick={() => onPlanTypeChange("software")}
              >
                Software
              </Button>
              <Button
                variant="ghost"
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  planType === "service" ? "bg-purple-600 text-white shadow-sm" : "text-gray-600 hover:text-purple-600"
                }`}
                onClick={() => onPlanTypeChange("service")}
              >
                Service
              </Button>
            </div>
          </motion.div>

          {/* Billing Type Toggle */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex bg-white p-2 rounded-full shadow-md">
              <Button
                variant="ghost"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingType === "monthly"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                onClick={() => onBillingTypeChange("monthly")}
              >
                Monthly Billing
              </Button>
              <Button
                variant="ghost"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingType === "yearly"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                onClick={() => onBillingTypeChange("yearly")}
              >
                Yearly Billing
              </Button>
              <Button
                variant="ghost"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingType === "lifetime"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                onClick={() => onBillingTypeChange("lifetime")}
              >
                Lifetime
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -bottom-10 left-0 w-full h-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L48 105C96 90 192 60 288 55C384 50 480 70 576 75C672 80 768 70 864 65C960 60 1056 60 1152 70C1248 80 1344 100 1392 110L1440 120V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V120Z"
            fill="white"
          />
        </svg>
      </motion.div>
    </section>
  )
}
