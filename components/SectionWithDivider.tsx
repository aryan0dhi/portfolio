interface SectionWithDividerProps {
  children: React.ReactNode;
  hideDivider?: boolean;
}

export default function SectionWithDivider({ children, hideDivider = false }: SectionWithDividerProps) {
  return (
    <>
      <section className="relative">
        {children}
      </section>
      {!hideDivider && (
        <div className="relative z-20 -my-px border-t border-trace/15" aria-hidden="true" />
      )}
    </>
  );
}
