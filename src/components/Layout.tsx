
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  className?: string
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div
      className={cn(
        'w-full h-full pt-8 px-8',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Layout
