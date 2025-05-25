'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from '@/lib/auth/actions'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import SignInSocial from './sign-in-social'

export default function LoginForm() {
  const initialState = {errorMessage: ""}
  const [state, formAction, pending] = useActionState(signIn, initialState);

  useEffect(() => {
    if(state.errorMessage.length) {
      toast.error(state.errorMessage)
    }
  },[state.errorMessage])

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        action={formAction}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
        <div className="p-8 pb-6">
          <div>
            <Link
              href="/"
              aria-label="go home">
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In</h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <SignInSocial provider='google'>
              <Icons.google />
              <span>Google</span>
            </SignInSocial>
            <SignInSocial provider='github'>
              <Icons.gitHub />
              <span>GitHub</span>
            </SignInSocial>
            <SignInSocial provider='kakaotalk'>
              <Icons.google />
              <span>Kakaotalk</span>
            </SignInSocial>
            <SignInSocial provider='naver'>
              <Icons.google />
              <span>Naver</span>
            </SignInSocial>
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="block text-sm">
                Username
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
              />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="pwd"
                  className="text-title text-sm">
                  Password
                </Label>
                <Button
                  asChild
                  variant="link"
                  size="sm">
                  <Link
                    href="/login/forgot-account"
                    className="link intent-info variant-ghost text-sm">
                    Forgot your account ?
                  </Link>
                </Button>
              </div>
              <Input
                type="password"
                required
                name="pwd"
                id="pwd"
                className="input sz-md variant-mixed"
              />
            </div>

            <Button className="w-full" disabled={pending} aria-disabled={pending}>Sign In</Button>
          </div>
        </div>

        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Don&apos;t have an account ?
            <Button
              asChild
              variant="link"
              className="px-2">
              <Link href="/sign-up">Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  )
}