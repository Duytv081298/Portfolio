import { type ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as LinkIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: string;
  accent?: string;
  icon?: ReactNode;
  align?: 'left' | 'center';
  index?: string;
  className?: string;
  id?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  accent,
  icon,
  align = 'left',
  index,
  className,
  id,
}: SectionHeaderProps) {
  const [copied, setCopied] = useState(false);
  const isCenter = align === 'center';
  const accentLabel = accent?.replace(/_/g, ' ');

  const handleCopyLink = () => {
    if (!id) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (!id) return;
    e.preventDefault();
    handleCopyLink();
  };

  return (
    <header
      className={`${className ?? 'mb-7'} ${isCenter ? 'text-center' : 'text-left'}`}
      data-section-index={index}
    >
      {accentLabel && (
        <p
          className={`mb-1.5 font-code text-[10px] font-bold uppercase tracking-[0.14em] text-primary ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {accentLabel}
        </p>
      )}

      <div className={`flex items-center gap-3 ${isCenter ? 'justify-center' : ''} relative`}>
        {icon && (
          <span className="flex size-9 shrink-0 items-center justify-center text-primary" aria-hidden="true">
            {icon}
          </span>
        )}
        <h2 
          onContextMenu={handleContextMenu}
          className="group/title relative flex items-center gap-2 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-text md:text-[2.5rem] cursor-pointer select-none"
          title={id ? "Right-click to copy link to this section" : undefined}
        >
          <span>{title}</span>
          {id && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyLink();
              }}
              type="button"
              className="opacity-0 group-hover/title:opacity-100 transition-opacity duration-200 text-text-secondary hover:text-primary p-1 rounded-md hover:bg-card cursor-pointer"
              aria-label={`Copy link to ${title} section`}
              title="Copy link to this section"
            >
              <LinkIcon size={18} />
            </button>
          )}
          
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: -25, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-0 z-20 rounded-md bg-[#050b17] border border-violet-500/40 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.25)]"
              >
                Link Copied!
              </motion.span>
            )}
          </AnimatePresence>
        </h2>
      </div>

      {subtitle && (
        <p
          className={`mt-1.5 text-[13px] leading-5 text-text-secondary md:text-sm ${
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-3xl'
          }`}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
