'use client'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import {
  ArrowRight, // Switched to ArrowRight to match the straight arrow in the image
  Envelope,
  Phone,
  Buildings,
} from '@phosphor-icons/react/dist/ssr'
import { getClientSideURL } from '@/utilities/getURL'
import { fields } from '../Form/fields'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'

// Types
type ContactBlockProps = {
  headline: string
  subheadline?: string
  form: FormType
  email: string
  phone?: string
  addresses?: {
    label: string
    value: string
    id?: string
  }[]
  socialLinks?: {
    platform: string
    url: string
    id?: string
  }[]
  mapEmbedUrl?: string
  theme?: 'dark' | 'charcoal'
}

export const ContactBlock: React.FC<ContactBlockProps> = (props) => {
  const {
    headline,
    subheadline,
    form: formFromProps,
    email,
    phone,
    addresses,
    mapEmbedUrl,
    theme = 'dark',
  } = props

  // Form Logic
  const formID = formFromProps?.id
  const { confirmationType, redirect } = formFromProps || {}

  const formMethods = useForm({
    defaultValues: formFromProps?.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            if (url) router.push(url)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  const bgColor = theme === 'charcoal' ? 'bg-smatch-charcoal' : 'bg-smatch-black'

  return (
    <section className={cn('relative w-full py-16 lg:py-20 overflow-hidden', bgColor)}>
      {/* Background Decor */}
      <div className="pointer-events-none absolute right-0 top-0 size-[50vw] max-h-[500px] max-w-[500px] rounded-full bg-smatch-gold/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-[30vw] max-h-[300px] max-w-[300px] rounded-full bg-white/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto">
        {/* 1. Header Section */}
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border-yellow-500/20 bg-yellow-500/10  px-4 py-1.5 backdrop-blur-sm">
            <div className="size-2 animate-pulse rounded-md bg-yellow-500" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-yellow-500">
              Status: Online
            </span>
          </div>

          <h2 className="mb-6 font-heading text-4xl font-bold tracking-tight text-white md:text-6xl">
            {headline}
          </h2>

          {subheadline && (
            <p className="max-w-2xl font-sans text-lg leading-relaxed text-zinc-400">
              {subheadline}
            </p>
          )}
        </div>

        <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* 2. Left Column: Contact Info */}
          <div className="flex flex-col gap-6">
            {/* Email Card */}
            <div className="group rounded-lg border border-white/5 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-smatch-gold/30">
              <div className="flex items-center gap-6 space-x-3">
                <div className="rounded-md border border-smatch-gold/20 bg-smatch-gold/5 p-3 text-smatch-gold transition-colors duration-300 group-hover:bg-smatch-gold group-hover:text-black">
                  <Envelope size={24} weight="regular" />
                </div>
                <div className="w-full pl-5">
                  <span className="mb-1 block font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-smatch-gold/70">
                    Discutez avec nous
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-lg font-bold text-white transition-colors hover:text-smatch-gold md:text-xl"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            {phone && (
              <div className="group rounded-lg border border-white/5 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-smatch-gold/30">
                <div className="flex items-center gap-6">
                  <div className="rounded-md border border-smatch-gold/20 bg-smatch-gold/5 p-3 text-smatch-gold transition-colors duration-300 group-hover:bg-smatch-gold group-hover:text-black">
                    <Phone size={24} weight="regular" />
                  </div>
                  <div>
                    <span className="mb-1 block font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-smatch-gold/70">
                      Appelez-nous
                    </span>
                    <a
                      href={`tel:${phone}`}
                      className="text-lg font-bold text-white transition-colors hover:text-smatch-gold md:text-xl"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Office Addresses */}
            {addresses && addresses.length > 0 && (
              <div className="group relative overflow-hidden rounded-lg border border-white/5 bg-zinc-900/50 p-8 transition-all duration-300 hover:border-smatch-gold/30">
                <div className="mb-6 flex items-center gap-3">
                  <Buildings size={24} className="text-smatch-gold" weight="regular" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-smatch-gold">
                    Nos Locaux
                  </h4>
                </div>
                <div className="space-y-6">
                  {addresses.map((addr, idx) => (
                    <div key={idx} className="border-l border-white/10 pl-4 transition-colors group-hover:border-white/20">
                      <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                        {addr.label}
                      </span>
                      <p className="font-bold leading-snug text-white">
                        {addr.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Right Column: Form */}
          <div className="rounded-lg border border-white/5 bg-zinc-900/50 p-8 shadow-lg md:p-10">
            <div className="mb-8 border-b border-white/10 pb-6">
              <h3 className="mb-2 font-mono text-2xl font-bold uppercase tracking-tight text-white">
                Envoyez un message
              </h3>
              <p className="font-mono text-sm text-zinc-500">
                Réponse sous 24h garantie
              </p>
            </div>

            {!formFromProps ? (
              <div className="py-10 text-center font-mono text-zinc-500">
                ERR_NO_FORM_SELECTED
              </div>
            ) : (
              <FormProvider {...formMethods}>
                {!isLoading && hasSubmitted && confirmationType === 'message' && (
                  <div className="rounded-sm border border-smatch-gold bg-smatch-gold/10 p-6 text-center text-smatch-gold">
                    <h4 className="mb-2 font-heading text-xl">Message Envoyé</h4>
                    <p className="text-sm">Merci. Nous vous contacterons rapidement.</p>
                  </div>
                )}
                {isLoading && !hasSubmitted && (
                  <div className="animate-pulse py-12 text-center font-mono text-sm uppercase tracking-widest text-smatch-gold">
                    Transmission en cours...
                  </div>
                )}
                {error && (
                  <div className="mb-6 rounded-sm border border-red-500/50 bg-red-900/20 p-4 font-mono text-sm text-red-500">
                    Erreur: {error.message}
                  </div>
                )}
                {!hasSubmitted && (
                  <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-6">
                      {formFromProps.fields?.map((field, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Field: React.FC<any> =
                          fields?.[field.blockType as keyof typeof fields]

                        if (Field) {
                          return (
                            <div key={index} className="group gap-2">

                              <Field
                                form={formFromProps}
                                {...field}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                                className="w-full rounded-md border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none transition-all placeholder:text-zinc-700 focus:border-smatch-gold focus:ring-1 focus:ring-smatch-gold"
                              />
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>

                    <div className="pt-4">
                      <Button
                        form={formID}
                        type="submit"
                        disabled={isLoading}
                        className="group h-12 w-full rounded-md bg-smatch-gold text-sm font-bold uppercase tracking-widest text-black shadow-lg shadow-smatch-gold/10 transition-all duration-300 hover:bg-smatch-gold-light"
                      >
                        <span className="flex items-center gap-2">
                          Envoyer
                          <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </div>
                  </form>
                )}
              </FormProvider>
            )}
          </div>
        </div>

        {/* 4. Map Section (Bottom) */}
        {mapEmbedUrl && (
          <div className="group relative h-[400px] w-full overflow-hidden rounded-xl border border-white/10  grayscale transition-all duration-700 ease-in-out md:h-[500px]">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(100%) contrast(100%) opacity(0.8)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
              className="size-full"
            />
            {/* Overlay to ensure dark mode consistency */}
            <div className="pointer-events-none absolute inset-0 bg-smatch-black/10 mix-blend-multiply" />
            <div className="pointer-events-none absolute inset-0 bg-smatch-gold/5 mix-blend-overlay" />
          </div>
        )}
      </div>
    </section>
  )
}
