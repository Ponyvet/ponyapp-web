import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'

export interface ConfirmDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
}

export const ConfirmDialog = ({
  open,
  onConfirm,
  onCancel,
  title = '¿Estás absolutamente seguro?',
  description = 'Esta acción no se puede deshacer.',
  confirmText = 'Continuar',
  cancelText = 'Cancelar',
  isLoading = false,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
