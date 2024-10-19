import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

const ImageSlider = ({ images, intervalTime }) => {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length)
        }, intervalTime)

        return () => clearInterval(interval)
    }, [images.length, intervalTime])

    return (
        <motion.div key={currentImage}>
            <Image className="h-full w-full rounded-sm" src={images[currentImage]} alt={`image-${currentImage}`} />
        </motion.div>
    )
}

export default ImageSlider
