import { DecisionCard } from '@/components/decision-vault/decision-card';
import { StatusBadge } from '@/components/decision-vault/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// Actually I'll stick to what I know exists: Button, Badge, Card, DecisionCard components.

export function ComponentShowcase() {
  return (
    <div className="bg-background min-h-screen space-y-12 p-10">
      <div className="space-y-4">
        <h1 className="text-foreground text-3xl font-bold">
          Design System & Component Showcase
        </h1>
        <p className="text-muted-foreground">
          Verification of React 19 + Tailwind v4 Refactor
        </p>
      </div>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="border-b pb-2 text-xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Icon">
            <span className="text-xs">👋</span>
          </Button>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="border-b pb-2 text-xl font-semibold">Badges</h2>
        <div className="flex gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <div className="flex gap-4">
          <StatusBadge status="proposed" />
          <StatusBadge status="approved" />
          <StatusBadge status="implemented" />
          <StatusBadge status="deprecated" />
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="border-b pb-2 text-xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
              <CardDescription>
                This is a standard shadcn card component.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Card content goes here. The structure is semantic and
                accessible.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Action</Button>
            </CardFooter>
          </Card>

          {/* Decision Card (v0 component) */}
          <DecisionCard
            title="Adopt NestJS for Backend"
            status="approved"
            timestamp="2025-10-15"
            author="Tech Lead"
            source="meeting"
            context="Need a structured framework for long-term maintainability."
            rationale="NestJS offers great TS support and modular architecture out of the box."
            alternatives={[
              'Express.js (Too loose)',
              'Fastify (Good but less opinionated)',
            ]}
            showAlternatives={true}
          />

          <DecisionCard
            title="Use Tailwind CSS v4"
            status="implemented"
            timestamp="2025-12-16"
            author="Frontend Team"
            source="slack"
            context="Current setup feels outdated."
            rationale="Performance gains and simpler configuration."
            alternatives={['Styled Components', 'Emotion']}
          />
        </div>
      </section>
    </div>
  );
}
