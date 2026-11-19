import { motion } from "motion/react";
import Image from "next/image";
export default function AdjacentCard({ client, scale, opacity, onClick }) {

  const firstStory = client.stories[0];

  const thumbnail =
    firstStory.type === "video" ? firstStory.poster : firstStory.url;
  return (
    <motion.button
      // whileHover={{ scale: scale + 0.03, opacity: opacity + 0.1 }}
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden cursor-pointer shrink-0 w-[${340 * scale}px] h-[${600 * scale}px] opacity-[${opacity}] bg-[${client.bgColor}]`}
    >
      <Image src={thumbnail} className="w-full h-full object-cover" loading="lazy" alt={client.name}/>
      <div className="absolute inset-0 flex flex-col justify-end p-3 bg-[linear-gradient(to_top,rgba(0,0,0,0.6)_0%,transparent_50%)]">
        <div className="text-white text-xs font-semibold">{client.name}</div>
        <div className="text-white/70 text-[10px]">{client.category}</div>
      </div>
    </motion.button>
  );
}
