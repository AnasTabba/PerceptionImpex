import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { contact } from "@/lib/content";

/** Closing dark CTA band that funnels to the quote form. */
export function CtaBand({ title, body }: { title: string; body: string }) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal className="flex flex-col items-start gap-5 rounded-2xl bg-ink px-7 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight-display text-balance sm:text-3xl">
              {title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">{body}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Button as="a" href="/#quote" variant="onDark" size="lg">
              Request a Quote
            </Button>
            <span className="hidden text-sm text-white/60 sm:inline">{contact.phone}</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
