import { useTranslation } from 'react-i18next'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { loginSchema, type LoginInput } from '../models/login'
import useLogin from '../queries/useLogin'

const defaultValues: LoginInput = {
  email: '',
  password: '',
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(loginSchema),
  })
  const {
    mutateAsync: login,
    isPending: isLoadingLogin,
    error: loginError,
  } = useLogin()
  const { t } = useTranslation('auth')
  const emailError = errors.email?.message
  const passwordError = errors.password?.message
  const navigate = useNavigate()

  const handleOnSubmit: SubmitHandler<LoginInput> = async (data) => {
    const res = await login(data)

    if (res.status === 401) {
      return
    }

    navigate('/')
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="px-6 md:px-8 py-6 md:py-10"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t('login.welcomeBack')}</h1>
                <p className="text-muted-foreground text-balance">
                  {t('login.title')}
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">{t('login.email')}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  required
                  {...register('email')}
                />
                {emailError && (
                  <FieldDescription className="text-sm text-red-600">
                    {emailError}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">
                    {t('login.password')}
                  </FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register('password')}
                />
                {passwordError && (
                  <FieldDescription className="text-sm text-red-600">
                    {passwordError}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isLoadingLogin}>
                  {t('login.submit')}
                </Button>
              </Field>
            </FieldGroup>
            {loginError && (
              <p className="mt-4 text-center text-sm text-red-600">
                {t('login.invalidCredentials')}
              </p>
            )}
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/src/assets/undraw_petting_xclp.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-center dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
