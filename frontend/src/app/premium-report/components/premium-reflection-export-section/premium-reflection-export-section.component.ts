import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PremiumNarrativeReport } from '../../models/premium-narrative-report.model';
import {
  buildPremiumAiReflectionPrompt,
  buildPremiumReflectionMarkdown
} from '../../utils/premium-report-reflection-export.util';

type CopyState = 'idle' | 'copied' | 'failed';

@Component({
  selector: 'app-premium-reflection-export-section',
  standalone: true,
  templateUrl: './premium-reflection-export-section.component.html',
  styleUrl: './premium-reflection-export-section.component.css'
})
export class PremiumReflectionExportSectionComponent {
  @Input() report: PremiumNarrativeReport | null = null;

  private readonly router = inject(Router);

  protected promptCopyState: CopyState = 'idle';
  protected noteCopyState: CopyState = 'idle';
  protected manualPromptText = '';
  protected manualNoteText = '';

  protected goToPrintPage(): void {
    const currentPath = this.router.url.split(/[?#]/)[0];

    if (currentPath.endsWith('/print')) {
      return;
    }

    void this.router.navigateByUrl(`${currentPath}/print`);
  }

  protected async copyAiPrompt(): Promise<void> {
    await this.copyText('prompt', this.report ? buildPremiumAiReflectionPrompt(this.report) : '');
  }

  protected async copyReflectionNote(): Promise<void> {
    await this.copyText('note', this.report ? buildPremiumReflectionMarkdown(this.report) : '');
  }

  protected getPromptButtonLabel(): string {
    return this.getButtonLabel(this.promptCopyState, 'Copy AI Prompt');
  }

  protected getNoteButtonLabel(): string {
    return this.getButtonLabel(this.noteCopyState, 'Copy Reflection Notes');
  }

  private async copyText(kind: 'prompt' | 'note', text: string): Promise<void> {
    if (!text.trim()) {
      this.setCopyState(kind, 'failed');
      this.setManualText(kind, '');
      return;
    }

    try {
      await writeClipboardText(text);
      this.setCopyState(kind, 'copied');
      this.setManualText(kind, '');
      window.setTimeout(() => this.setCopyState(kind, 'idle'), 2200);
    } catch {
      this.setCopyState(kind, 'failed');
      this.setManualText(kind, text);
    }
  }

  private setCopyState(kind: 'prompt' | 'note', state: CopyState): void {
    if (kind === 'prompt') {
      this.promptCopyState = state;
      return;
    }

    this.noteCopyState = state;
  }

  private setManualText(kind: 'prompt' | 'note', text: string): void {
    if (kind === 'prompt') {
      this.manualPromptText = text;
      return;
    }

    this.manualNoteText = text;
  }

  private getButtonLabel(state: CopyState, defaultLabel: string): string {
    if (state === 'copied') {
      return 'Copied';
    }

    if (state === 'failed') {
      return 'Copy Manually';
    }

    return defaultLabel;
  }
}

async function writeClipboardText(text: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Some embedded browsers deny navigator.clipboard even after a click.
      // Fall through to the textarea-based copy path.
    }
  }

  if (typeof document === 'undefined') {
    throw new Error('Clipboard is not available.');
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const copied = document.execCommand('copy');

    if (!copied) {
      throw new Error('Fallback clipboard copy failed.');
    }
  } finally {
    document.body.removeChild(textarea);
  }
}
