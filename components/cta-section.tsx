"use client"

import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-900">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 right-[10%] w-80 h-80 rounded-full bg-white opacity-5 blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-4 backdrop-blur-sm">
              GET STARTED TODAY
            </div>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Ad Creation Process?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-purple-100 mb-8">
            Join thousands of businesses that are saving time and increasing conversions with Quickads.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-700 hover:bg-purple-50 transition-all duration-300 text-base shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </Button>
            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-11 rounded-md px-8 bg-white text-purple-700 hover:bg-purple-50 transition-all duration-300 text-base shadow-lg hover:shadow-xl">Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" /></button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
