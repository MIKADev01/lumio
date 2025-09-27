import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ArtworkCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const ArtworkCard = ({
  imageUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
  title = "AI Generated Artwork",
  description = "Beautiful artwork created with artificial intelligence",
  onClick = () => {},
}: ArtworkCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer bg-background"
      onClick={onClick}
    >
      <Card className="overflow-hidden border-0 shadow-lg rounded-xl h-full">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtworkCard;
