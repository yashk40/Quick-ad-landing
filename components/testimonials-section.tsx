"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Star, Quote } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc.",
    content:
      "Quickads has completely transformed our ad creation process. What used to take our team days now takes minutes. The templates are professional and the customization options are exactly what we needed.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Michael Chen",
    role: "E-commerce Owner",
    company: "StyleBoutique",
    content:
      "As a small business owner, I don't have time to learn complex design tools. Quickads makes it incredibly easy to create stunning ads that actually convert. My sales have increased by 40% since I started using it.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Jessica Williams",
    role: "Social Media Manager",
    company: "Pulse Agency",
    content:
      "We manage social media for over 20 clients, and Quickads has been a game-changer for our workflow. The ability to quickly create and customize ads for different platforms saves us countless hours every week.",
    rating: 4,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "David Rodriguez",
    role: "Freelance Designer",
    company: "Self-employed",
    content:
      "I was skeptical at first, but Quickads has become an essential tool in my design arsenal. It helps me deliver more value to my clients by speeding up the ad creation process without sacrificing quality.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Emma Thompson",
    role: "Digital Marketing Specialist",
    company: "GrowthLabs",
    content:
      "The templates in Quickads are not only beautiful but also highly effective. We've seen a significant improvement in our clients' ad performance since we started using this platform.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function TestimonialsSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16" variants={containerVariants} initial="hidden" animate={controls}>
          <motion.div variants={itemVariants}>
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded-full mb-4 shadow-sm">
              TESTIMONIALS
            </div>
          </motion.div>
          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-600"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied users who have transformed their advertising with Quickads.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 relative"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-purple-100" />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-200 rounded-full blur-sm transform -translate-x-1 translate-y-1"></div>
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-white relative z-10"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 relative z-10">{testimonial.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
