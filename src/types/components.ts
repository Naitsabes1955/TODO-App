export interface ButtonProps {
  children: React.ReactNode

  onClick?: () => void

  type?: "button" | "submit"
}


export interface InputProps {
  value: string

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  placeholder?: string
}
