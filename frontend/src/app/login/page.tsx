import { LoginForm } from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-99px)] items-center justify-center -mt-[99px] pt-[99px]">
      <div className="w-full max-w-sm">
        <LoginForm 
          title="Velkommen" 
          redirectUrl="/"
        />
      </div>
    </div>
  )
}
