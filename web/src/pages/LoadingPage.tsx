import { Spinner } from "@/components/ui/spinner"

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <Spinner className="size-15 text-orange-500" />
      <p className="font-bold text-gray-600">Carregando</p>
    </div>
  )
}

export default LoadingPage