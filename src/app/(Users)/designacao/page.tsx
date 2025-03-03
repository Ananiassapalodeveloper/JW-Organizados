import React from "react";
import { CardPersonalDesignation } from "./components/CardPersonalDesignation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LucideAlertOctagon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Designation() {
  return (
    <main className="mt-[104px] container space-y-10">
      <section className="mt-20 space-y-5">
        <h1>As tuas Designações para esta semana</h1>
        <div className="space-y-3">
          <h2>Reunião do meio de semana</h2>
          <CardPersonalDesignation />
        </div>
        <div className="space-y-3">
          <h2>Reunião do fim de semana</h2>
          <span className="text-xl text-red-500 p-2 /10 flex gap-2 items-center justify-center">
            <LucideAlertOctagon size={30} /> Nenhuma designação
          </span>
        </div>
      </section>
      <section>
        <h1>Todas as tuas Designações</h1>
      
      </section>
      <div className="w-full flex-col gap-4 md:flex">
        <Tabs defaultValue="jan" className="">
          <TabsList className="w-full">
            <TabsTrigger  color="red" value="jan">janeiro</TabsTrigger>
            <TabsTrigger value="fev">Fevereiro</TabsTrigger>
            <TabsTrigger value="mar">Março</TabsTrigger>
            <TabsTrigger value="abr">Abril</TabsTrigger>
            <TabsTrigger value="mai">Maio</TabsTrigger>
            <TabsTrigger value="jun">Junho</TabsTrigger>
            <TabsTrigger value="jul">Julho</TabsTrigger>
            <TabsTrigger value="ago">Agosto</TabsTrigger>
            <TabsTrigger value="set">Setembro</TabsTrigger>
            <TabsTrigger value="out">Outubro</TabsTrigger>
            <TabsTrigger value="nov">Novembro</TabsTrigger>
            <TabsTrigger value="dez">Dezembro</TabsTrigger>
          </TabsList>

          <TabsContent value="jan">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" -left-7"/>
              <CarouselNext className=" -right-1"/>
            </Carousel>
          </TabsContent>

          <TabsContent value="fev">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" -left-7"/>
              <CarouselNext className=" -right-1"/>
            </Carousel>
          </TabsContent>

          <TabsContent value="mar">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-7"/>
              <CarouselNext className="-right-1"/>
            </Carousel>
          </TabsContent>
          <TabsContent value="abr">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" -left-7"/>
              <CarouselNext className=" -right-1"/>
            </Carousel>
          </TabsContent>
          <TabsContent value="mai">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" -left-7"/>
              <CarouselNext className=" -right-1"/>
            </Carousel>
          </TabsContent>
          <TabsContent value="jun">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" -left-7"/>
              <CarouselNext className=" -right-1"/>
            </Carousel>
          </TabsContent>
          <TabsContent value="jul">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" -left-7"/>
              <CarouselNext className=" -right-1"/>
            </Carousel>
          </TabsContent>
          <TabsContent value="ago">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" -left-7"/>
              <CarouselNext className=" -right-1"/>
            </Carousel>
          </TabsContent>
          <TabsContent value="set">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" -left-7"/>
              <CarouselNext className=" -right-1"/>
            </Carousel>
          </TabsContent>
          <TabsContent value="out">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" -left-7"/>
              <CarouselNext className=" -right-1"/>
            </Carousel>
          </TabsContent>
          <TabsContent value="nov">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" -left-7"/>
              <CarouselNext className=" -right-1"/>
            </Carousel>
          </TabsContent>
          <TabsContent value="dez">
            <Carousel
              className="*:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                    <CardPersonalDesignation/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" -left-7"/>
              <CarouselNext className=" -right-1"/>
            </Carousel>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
