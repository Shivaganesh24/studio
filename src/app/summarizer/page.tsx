import MainLayout from '@/components/main-layout';
import { SummarizerClient } from './summarizer-client';

export default function SummarizerPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">AI Content Summarizer</h2>
          <p className="text-muted-foreground">
            Paste a URL to a financial article (e.g., from SEBI or a news site)
            to get a 100-word summary.
          </p>
        </div>
        <SummarizerClient />
      </div>
    </MainLayout>
  );
}
