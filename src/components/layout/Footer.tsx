import { GithubIcon } from '@/components/icons'

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          Built by{' '}
          <a
            href="https://github.com/pedrordgs"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
          >
            pedrordgs
          </a>
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Source code</span>
          <a
            href="https://github.com/pedrordgs/github-timeline"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
