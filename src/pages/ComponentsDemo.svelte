<script>
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
</script>

<div class="min-h-screen bg-background p-8">
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-4xl font-bold text-foreground">Componentes Shadcn-Svelte</h1>
      <p class="text-muted-foreground text-lg">
        Demostración del preset Lyra con Nunito Sans y estilo Zinc
      </p>
    </div>

    <!-- Buttons Section -->
    <Card.Root>
      <Card.Header>
        <Card.Title>Botones</Card.Title>
        <Card.Description>
          Diferentes variantes de botones con el estilo Lyra
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="flex flex-wrap gap-4">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
      </Card.Content>
    </Card.Root>

    <!-- Form Section -->
    <Card.Root>
      <Card.Header>
        <Card.Title>Formulario de Ejemplo</Card.Title>
        <Card.Description>
          Inputs y labels con el tema Lyra
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <form class="space-y-4">
          <div class="space-y-2">
            <Label for="name">Nombre</Label>
            <Input id="name" placeholder="Ingresa tu nombre" />
          </div>
          
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="tu@email.com" />
          </div>
          
          <div class="space-y-2">
            <Label for="message">Mensaje</Label>
            <Input id="message" placeholder="Escribe un mensaje" />
          </div>
          
          <Button type="submit" class="w-full">Enviar</Button>
        </form>
      </Card.Content>
    </Card.Root>

    <!-- Color Palette Section -->
    <Card.Root>
      <Card.Header>
        <Card.Title>Paleta de Colores</Card.Title>
        <Card.Description>
          Colores del tema Zinc con estilo Lyra
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="space-y-2">
            <div class="h-20 rounded-lg bg-primary"></div>
            <p class="text-sm font-semibold">Primary</p>
          </div>
          <div class="space-y-2">
            <div class="h-20 rounded-lg bg-secondary"></div>
            <p class="text-sm font-semibold">Secondary</p>
          </div>
          <div class="space-y-2">
            <div class="h-20 rounded-lg bg-accent"></div>
            <p class="text-sm font-semibold">Accent</p>
          </div>
          <div class="space-y-2">
            <div class="h-20 rounded-lg bg-muted"></div>
            <p class="text-sm font-semibold">Muted</p>
          </div>
          <div class="space-y-2">
            <div class="h-20 rounded-lg bg-destructive"></div>
            <p class="text-sm font-semibold">Destructive</p>
          </div>
          <div class="space-y-2">
            <div class="h-20 rounded-lg border-2 border-border"></div>
            <p class="text-sm font-semibold">Border</p>
          </div>
          <div class="space-y-2">
            <div class="h-20 rounded-lg bg-card border"></div>
            <p class="text-sm font-semibold">Card</p>
          </div>
          <div class="space-y-2">
            <div class="h-20 rounded-lg bg-popover border"></div>
            <p class="text-sm font-semibold">Popover</p>
          </div>
        </div>
      </Card.Content>
    </Card.Root>

    <!-- Typography Section -->
    <Card.Root>
      <Card.Header>
        <Card.Title>Tipografía - Nunito Sans</Card.Title>
        <Card.Description>
          Diferentes pesos y tamaños de la fuente
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="space-y-4">
          <div>
            <p class="text-4xl font-bold">The quick brown fox</p>
            <p class="text-sm text-muted-foreground">Bold - 36px</p>
          </div>
          <div>
            <p class="text-2xl font-semibold">The quick brown fox</p>
            <p class="text-sm text-muted-foreground">Semibold - 24px</p>
          </div>
          <div>
            <p class="text-xl">The quick brown fox jumps over the lazy dog</p>
            <p class="text-sm text-muted-foreground">Regular - 20px</p>
          </div>
          <div>
            <p class="text-base text-muted-foreground">
              The quick brown fox jumps over the lazy dog. Esta es la fuente Nunito Sans
              configurada con el preset Lyra de shadcn.
            </p>
            <p class="text-sm text-muted-foreground">Regular - 16px - Muted</p>
          </div>
        </div>
      </Card.Content>
    </Card.Root>

    <!-- Dark Mode Toggle Info -->
    <Card.Root>
      <Card.Header>
        <Card.Title>Modo Oscuro</Card.Title>
        <Card.Description>
          Para activar el modo oscuro, agrega la clase "dark" al elemento raíz
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <p class="text-sm text-muted-foreground">
          El tema incluye soporte completo para modo oscuro con colores optimizados
          para ambos contextos. Puedes implementar un toggle agregando/removiendo
          la clase "dark" del elemento HTML o body.
        </p>
      </Card.Content>
    </Card.Root>
  </div>
</div>
