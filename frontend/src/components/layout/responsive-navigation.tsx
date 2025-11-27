'use client'

import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/src/components/ui/sheet'
import { Button } from '@/src/components/ui/button'
import { DashboardSidebar } from '@/src/components/layout/dashboard-sidebar'
import { useState } from 'react'

export function ResponsiveNavigation() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <DashboardSidebar onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
