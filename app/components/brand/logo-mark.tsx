/** Marca: círculo oscuro con una elipse cian inclinada (órbita), más "jdc". */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 38 38" className="size-[38px] shrink-0" aria-hidden="true">
        <circle cx="19" cy="19" r="19" className="fill-brand" />
        <ellipse
          cx="19"
          cy="19"
          rx="10"
          ry="4"
          transform="rotate(-25 19 19)"
          className="fill-accent"
        />
      </svg>
      <span className="font-display text-[26px] leading-none tracking-[-0.5px] text-brand">
        jdc
      </span>
    </span>
  );
}
