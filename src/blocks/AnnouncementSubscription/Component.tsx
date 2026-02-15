'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import { fields } from '../Form/fields'
import { getClientSideURL } from '@/utilities/getURL'
import { Bell, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'

export type AnnouncementSubscriptionBlockType = {
  blockName?: string
  blockType?: 'announcementSubscription'
  headline?: string
  description?: string
  form: FormType
}

export const AnnouncementSubscriptionBlock: React.FC<
  {
    id?: string
  } & AnnouncementSubscriptionBlockType
> = (props) => {
  const {
    headline,
    description,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
  } = props

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
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
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

        // delay loading indicator by 1s
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
            const redirectUrl = url
            if (redirectUrl) router.push(redirectUrl)
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

  return (
    <div className="container my-auto flex h-screen items-center justify-center">
      <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0F0F0F] p-8 md:p-12 lg:p-16">
        {/* Background Effects */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-[300px] rounded-full bg-[#FFAA00]/5 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-[300px] rounded-full bg-blue-500/5 blur-[100px]" />

        <div className="relative z-10 flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Left Content */}
          <div className="w-full max-w-xl text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <Bell weight="fill" className="text-[#FFAA00]" size={16} />
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                Restez Informé
              </span>
            </div>

            {headline && (
              <h2 className="mb-6 font-heading text-3xl font-black uppercase tracking-tighter text-white md:text-4xl lg:text-5xl">
                {headline}
              </h2>
            )}

            {description && (
              <p className="font-sans text-lg font-light leading-relaxed text-gray-400">
                {description}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-4 text-sm text-gray-500 lg:flex-row lg:items-center">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-white/10">
                  <EnvelopeSimple size={14} className="text-[#FFAA00]" />
                </div>
                <span>Newsletter mensuelle</span>
              </div>
              <div className="hidden size-1 rounded-full bg-gray-700 lg:block" />
              <span>Désabonnement à tout moment</span>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full max-w-md rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-6 text-center">
                  <div className="mb-2 text-xl font-bold text-green-500">Succès !</div>
                  <div className="text-gray-300">
                    {confirmationMessage && <RichText data={confirmationMessage} />}
                    {/* Note: confirmationMessage is RichText, simplistic rendering here.
                         Ideally use RichText component but it might be complex to integrate quickly.
                         For now assuming simple text or falling back.
                         Actually, let's just use a simple success message if RichText is too complex to parse right now without the component.
                     */}
                  </div>
                </div>
              )}
              {isLoading && !hasSubmitted && (
                <div className="flex justify-center py-10">
                  <div className="size-8 animate-spin rounded-full border-2 border-[#FFAA00] border-t-transparent" />
                </div>
              )}
              {error && (
                <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
                  {error.message || 'Une erreur est survenue.'}
                </div>
              )}

              {!hasSubmitted && (
                <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-4">
                    {formFromProps &&
                      formFromProps.fields &&
                      formFromProps.fields.map((field, index) => {
                        const Field: React.FC<any> = (fields as Record<string, React.FC<any>>)?.[
                          field.blockType
                        ]
                        if (Field) {
                          return (
                            <div className="mb-4 last:mb-0" key={index}>
                              <Field
                                form={formFromProps}
                                {...field}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                                // Override some styles for the inputs if possible via classNames or context
                                // Assuming Field components accept className or similar
                              />
                            </div>
                          )
                        }
                        return null
                      })}
                  </div>

                  <Button
                    form={formID}
                    type="submit"
                    variant="default"
                    className="w-full bg-[#FFAA00] py-6 text-base font-bold text-black hover:bg-white"
                  >
                    {submitButtonLabel || "S'inscrire"}
                  </Button>
                </form>
              )}
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
