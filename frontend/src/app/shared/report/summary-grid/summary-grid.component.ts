import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ReportSummaryGroup, ReportSummaryTrait } from '../../../reports/models/report.model';

@Component({
  selector: 'app-summary-grid',
  standalone: true,
  imports: [NgClass],
  templateUrl: './summary-grid.component.html'
})
export class SummaryGridComponent {
  @Input() groups: ReportSummaryGroup[] = [];

  protected groupGridClasses(group: ReportSummaryGroup): string {
    if (group.key === 'emotion') {
      return 'grid-cols-2';
    }

    return 'grid-cols-2 sm:grid-cols-3';
  }

  protected activeCount(group: ReportSummaryGroup): number {
    return group.traits.filter((trait) => trait.state !== 'inactive').length;
  }

  protected traitClasses(trait: ReportSummaryTrait): string {
    if (trait.state === 'inactive') {
      return 'border-[#D8D8D0] bg-[#F3F3EE] text-[#746F60]';
    }

    if (trait.tone === 'positive') {
      return trait.state === 'severe'
        ? 'border-[#2F7FD1] bg-[#2F7FD1] text-white shadow-sm'
        : 'border-[#BFE3FA] bg-[#EDF8FF] text-[#087DC6]';
    }

    return trait.state === 'severe'
      ? 'border-[#B42318] bg-[#B42318] text-white shadow-sm'
      : 'border-[#F0C3BD] bg-[#FFF1EF] text-[#C0392F]';
  }
}
