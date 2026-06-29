import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'legacyHtml',
  standalone: true
})
export class LegacyHtmlPipe implements PipeTransform {
  transform(value: string | null | undefined, formatSummary = false): string {
    if (!value) {
      return '';
    }

    const html = value.replace(/\s(?:align|class|style)=(".*?"|'.*?'|[^\s>]+)/gi, '').trim();

    return formatSummary ? formatSummaryParagraphs(html) : html;
  }
}

function formatSummaryParagraphs(html: string): string {
  let result = html
    .replace(/\r\n?/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\n{3,}/g, '\n\n');

  result = insertSectionBreak(result, 'Adaptation Patterns');
  result = insertSectionBreak(result, 'Relationship Patterns');
  result = result.includes('Finally')
    ? insertSectionBreak(result, 'Finally')
    : insertSectionBreak(result, 'Social Expression Patterns');

  return result
    .trim()
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n{2}/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

function insertSectionBreak(value: string, marker: string): string {
  const index = value.indexOf(marker);

  if (index <= 0) {
    return value;
  }

  return `${value.slice(0, index).trimEnd()}\n\n${value.slice(index).trimStart()}`;
}
