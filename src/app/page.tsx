'use client';
import { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import messages from "@/messages.json";

const SkeletonCard = () => (
  <div className="p-1">
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4 rounded" />
      </CardHeader>
      <CardContent className="flex items-center justify-center p-6">
        <Skeleton className="h-10 w-1/2 rounded" />
      </CardContent>
    </Card>
  </div>
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-3xl font-bold">Dive into the Mystry World</h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          Explore Mystry Message — where your identity remains a secret
        </p>
      </section>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-48 sm:max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {messages.map((message) => (
            <CarouselItem key={message.title}>
              {isLoading ? (
                <SkeletonCard />
              ) : (
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{message.content}</span>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
};

export default Home;