type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, { text: string; color: string }> = {
  pending: { text: 'Pendente', color: 'bg-slate-400' },
  canceled: { text: 'Cancelado', color: 'bg-rose-500' },
  processing: { text: 'Em preparo', color: 'bg-amber-500' },
  delivering: { text: 'Em entrega', color: 'bg-indigo-400' },
  delivered: { text: 'Entregue', color: 'bg-emerald-500' },
}

export function OrderStatus({ status }: OrderStatusProps) {
  const { text, color } = orderStatusMap[status]

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="font-medium text-muted-foreground">{text}</span>
    </div>
  )
}
