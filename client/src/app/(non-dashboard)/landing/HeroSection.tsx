"use client";

import Image from "next/image";
import React from "react";
import {motion} from "framer-motion"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <Image
        src="/landing-splash.jpg"
        alt="Landing Splash"
        fill
        className="object-cover object-center"
        priority
      />
        <div className="absolute inset-0 bg-black bg-opacity-80">

        </div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            className="absolute top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
        >
            <div className="max-w-4xl mx-auto px-16 sm:px-12">
                <h1 className="text-5xl font-bold text-white mb-4">Bắt đầu cuộc hành trình tìm một nơi tốt nhất để gọi là <span className="text-secondary-800">Nhà!</span></h1>\
                <p className="text-xl text-white mb-8">Khám phá những căn hộ được thiết kế phù hợp với lối sống và nhu cầu của bạn</p>

                <div className="flex items-center justify-center">
                    <Input
                        type="text"
                        value="search query"
                        onChange={() => {}}
                        placeholder="Tìm kiếm theo thành phố, khu vực hoặc đại chỉ cụ thể,..."
                        className="w-full max-w-lg rounded-none rounded-l-xl bg-white h-12 "
                    />
                    <Button 
                        onClick={() => {}}
                        className="bg-secondary-500 text-white rounded-none rounded-r-xl border-none hover:bg-secondary-600 h-12"
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default HeroSection;
