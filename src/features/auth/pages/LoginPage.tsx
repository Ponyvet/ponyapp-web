import { LoginForm } from '@/features/auth/components/LoginForm'
import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router'
import { Card, CardContent } from '@/shared/components/ui/card'

export default function LoginPage() {
  const navigate = useNavigate()
  const { isAuth } = useAuthStore()

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <LoginForm />
              <div className="bg-secondary relative hidden md:block">
                <img
                  src="src/features/auth/assets/undraw_petting_xclp.svg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-center p-8"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
