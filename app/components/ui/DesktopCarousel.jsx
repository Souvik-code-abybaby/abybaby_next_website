"use client";
import { useState, useRef, useCallback } from "react";
import { useMotionValue, AnimatePresence, motion, animate } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import StoryCircle from "./StoryCircle";

const VISIBLE_DESKTOP = 6;
const ITEM_W = 72;
const ITEM_GAP = 18;
const ITEM_STRIDE = ITEM_W + ITEM_GAP;
const VIEWPORT_W = VISIBLE_DESKTOP * ITEM_STRIDE - ITEM_GAP; // 522

export default function DesktopCarousel({ clients, onStoryClick, onDismiss }) {
  const [offset, setOffset] = useState(0);
  const x = useMotionValue(0);
  const dragStartX = useRef(0);

  const maxOffset = Math.max(0, clients.length - VISIBLE_DESKTOP);
  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  const slideTo = useCallback(
    (newOffset) => {
      setOffset(newOffset);
      animate(x, -newOffset * ITEM_STRIDE, {
        type: "spring",
        stiffness: 220,
        damping: 26,
      });
    },
    [x],
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px 0",
        width: "100%",
        minWidth: 0,
      }}
    >
      {/* Outer wrapper: fixed width, NOT clipped, so arrows can sit outside */}
      <div
        style={{
          position: "relative",
          width: VIEWPORT_W,
          maxWidth: "100%",
          // outline: "3px solid red", // TEMP debug: uncomment to see the box
        }}
      >
        {/* Prev */}
        <AnimatePresence>
          {canPrev && (
            <motion.button
              key="prev"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => slideTo(Math.max(0, offset - 1))}
              className="absolute z-10 flex items-center justify-center rounded-full bg-white cursor-pointer w-7 h-7 -left-[14px] top-[calc(50%-16px)] -translate-y-1/2 shadow-[0_1px_6px_rgba(0,0,0,0.15)] border-[0.5px] border-[#e0e0e0]"
              aria-label="Previous"
            >
              <ChevronLeft size={14} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Clipping window: the ONLY element with overflow hidden */}
        <div style={{ overflow: "hidden", width: "100%", padding: "2px 0" }}>
          <motion.div
            style={{
              x,
              display: "flex",
              gap: ITEM_GAP,
              width: "max-content",
            }}
            drag="x"
            dragConstraints={{ left: -maxOffset * ITEM_STRIDE, right: 0 }}
            dragElastic={0.08}
            onDragStart={(_, info) => {
              dragStartX.current = info.point.x;
            }}
            onDragEnd={(_, info) => {
              const dx = info.offset.x;
              if (dx < -40 && canNext) slideTo(offset + 1);
              else if (dx > 40 && canPrev) slideTo(offset - 1);
              else slideTo(offset);
            }}
          >
            {clients.map((client) => (
              <div
                key={client.id}
                style={{ flex: `0 0 ${ITEM_W}px`, width: ITEM_W }}
              >
                <StoryCircle
                  client={client}
                  onClick={() => onStoryClick(client)}
                  onDismiss={onDismiss}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Next */}
        <AnimatePresence>
          {canNext && (
            <motion.button
              key="next"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => slideTo(Math.min(maxOffset, offset + 1))}
              className="absolute z-10 flex items-center justify-center rounded-full bg-white cursor-pointer w-7 h-7 -right-[14px] top-[calc(50%-16px)] -translate-y-1/2 shadow-[0_1px_6px_rgba(0,0,0,0.15)] border-[0.5px] border-[#e0e0e0]"
              aria-label="Next"
            >
              <ChevronRight size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}