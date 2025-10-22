import React from 'react';
import { Button } from '@/components/ui/button';

export default function ShadcnTest() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Prueba de shadcn/ui</h1>
      
      <div className="space-x-4">
        <Button>Botón por defecto</Button>
        <Button variant="secondary">Botón secundario</Button>
        <Button variant="outline">Botón outline</Button>
        <Button variant="destructive">Botón destructivo</Button>
        <Button variant="ghost">Botón ghost</Button>
        <Button variant="link">Botón link</Button>
      </div>
      
      <div className="space-x-4">
        <Button size="sm">Pequeño</Button>
        <Button size="default">Normal</Button>
        <Button size="lg">Grande</Button>
        <Button size="icon">📧</Button>
      </div>
    </div>
  );
}





