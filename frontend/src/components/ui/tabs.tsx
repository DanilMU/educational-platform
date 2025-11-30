'use client';

import * as React from 'react';
import { cn } from '@/src/lib/utils';

interface TabsContextProps {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextProps | null>(null);

interface TabsProps {
  value?: string;
  onValueChange?: (value: string) => void;
 defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, defaultValue, className, children }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  
  const currentValue = value !== undefined ? value : internalValue;
  const handleChange = onValueChange || setInternalValue;

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export function TabsList({ className, children }: TabsListProps) {
  return (
    <div className={cn('flex border-b', className)}>{children}</div>
  );
}

interface TabsTriggerProps {
  value: string;
  className?: string;
 children: React.ReactNode;
}

export function TabsTrigger({ value, className, children }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const { value: currentValue, onValueChange } = context;
  const isSelected = currentValue === value;

  return (
    <button
      className={cn(
        'py-2 px-4 font-medium text-sm border-b-2 transition-colors',
        isSelected
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700',
        className
      )}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function TabsContent({ value, className, children }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  const { value: currentValue } = context;
  const isVisible = currentValue === value;

  if (!isVisible) return null;

  return (
    <div className={cn('mt-4', className)}>
      {children}
    </div>
  );
}

export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps };