import React from "react";
import ArtworkCard from "./ArtworkCard";

interface ImageGridProps {
  images?: Array<{
    id: string;
    url: string;
    title: string;
    description: string;
  }>;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images = [] }) => {
  // Default images if none are provided
  const defaultImages = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      title: "Cosmic Gradient",
      description: "AI-generated abstract cosmic gradient with vibrant colors",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
      title: "Digital Landscape",
      description: "AI-generated digital landscape with futuristic elements",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
      title: "Abstract Patterns",
      description: "AI-generated abstract patterns with geometric shapes",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1614851099511-773084f6911d?w=800&q=80",
      title: "Neural Network",
      description: "AI-generated visualization of neural network connections",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1633109741715-f64b1b6a1ecf?w=800&q=80",
      title: "Digital Dreams",
      description: "AI-generated dreamlike digital landscape",
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
      title: "Fractal Universe",
      description: "AI-generated fractal patterns resembling cosmic structures",
    },
    {
      id: "7",
      url: "https://images.unsplash.com/photo-1633186710895-309db2dfb009?w=800&q=80",
      title: "Quantum Field",
      description: "AI-generated visualization of quantum field theory",
    },
    {
      id: "8",
      url: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&q=80",
      title: "Digital Waves",
      description: "AI-generated abstract wave patterns with vibrant colors",
    },
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          AI-Generated Artwork
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Explore our collection of stunning AI-generated artwork created using
          advanced machine learning algorithms.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayImages.map((image) => (
            <ArtworkCard
              key={image.id}
              imageUrl={image.url}
              title={image.title}
              description={image.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGrid;
