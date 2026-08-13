import React, { useState } from "react";

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({ activeTab: "", setActiveTab: () => {} });

export function Tabs({ children, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return (
    <div className={`flex gap-2 border-b border-trace/25 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = "", ...props }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-colors relative ${
        isActive ? "text-signal" : "text-muted hover:text-ink"
      } ${className}`}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-signal" />
      )}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }: TabsContentProps) {
  const { activeTab } = React.useContext(TabsContext);

  if (activeTab !== value) return null;

  return <div className={className}>{children}</div>;
}
