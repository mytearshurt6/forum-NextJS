type Props = {
  children: React.ReactNode
}

export function TypographyH3({ children }: Props) {
  return <h3 className="scroll-m-20 text-base font-semibold tracking-tight">{children}</h3>
}
