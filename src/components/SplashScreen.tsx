"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users } from "lucide-react"
import type React from "react" // Added import for React

interface SplashScreenProps {
  finishLoading: () => void
}

const SplashScreen: React.FC<SplashScreenProps> = ({ finishLoading }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => finishLoading(), 2000)
    return () => clearTimeout(timeout)
  }, [finishLoading])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="mb-4"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        >
          <Users className="h-16 w-16 text-white" />
        </motion.div>
        <motion.h1
          className="text-3xl font-bold text-white mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Organizado
        </motion.h1>
        <motion.p
          className="text-white text-opacity-80"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Gestão Congregacional Simplificada
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default SplashScreen

