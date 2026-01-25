import { useState, useCallback } from 'react'

export interface ConfirmOptions {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [resolveReject, setResolveReject] = useState<{
    resolve: (value: boolean) => void
    reject: () => void
  } | null>(null)
  const [options, setOptions] = useState<ConfirmOptions>({})

  const confirm = useCallback(
    (confirmOptions?: ConfirmOptions): Promise<boolean> => {
      setOptions({
        title: '¿Estás absolutamente seguro?',
        description: 'Esta acción no se puede deshacer.',
        confirmText: 'Continuar',
        cancelText: 'Cancelar',
        ...confirmOptions,
      })
      setIsOpen(true)

      return new Promise<boolean>((resolve, reject) => {
        setResolveReject({ resolve, reject })
      })
    },
    [],
  )

  const handleConfirm = useCallback(() => {
    if (resolveReject) {
      resolveReject.resolve(true)
      setResolveReject(null)
    }
    setIsOpen(false)
  }, [resolveReject])

  const handleCancel = useCallback(() => {
    if (resolveReject) {
      resolveReject.resolve(false)
      setResolveReject(null)
    }
    setIsOpen(false)
  }, [resolveReject])

  return {
    confirm,
    isOpen,
    options,
    handleConfirm,
    handleCancel,
  }
}
