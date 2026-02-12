type SpinnerProps = {
  size?: number
}

export const Spinner = ({ size = 24 }: SpinnerProps) => {
  return (
    <div
      className="border-4 border-orange-500 border-t-transparent rounded-full animate-spin"
      style={{ width: size, height: size }}
    />
  )
}
