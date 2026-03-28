import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import messages from "@/messages.json"

const Home = () => {
  return(
    <main className="grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold"> Dive into the mystry World </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">Explore Mystry Message where your identity remains a secret</p>
      </section>
      
    </main>
  )
}

export default Home