import { Component, Input } from '@angular/core';

import { ReportImage } from '../../../reports/models/report.model';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  templateUrl: './image-viewer.component.html'
})
export class ImageViewerComponent {
  @Input({ required: true }) images: ReportImage[] = [];

  protected get sortedImages(): ReportImage[] {
    return [...this.images].sort((a, b) => imageSortValue(a) - imageSortValue(b));
  }

  protected imageUrl(image: ReportImage): string {
    return image.url || image.imageUrl || '';
  }

  protected imageKey(image: ReportImage, index: number): string {
    return image.filename || image.url || image.imageUrl || String(index);
  }
}

function imageSortValue(image: ReportImage): number {
  const sort = Number(image.sort);
  return Number.isFinite(sort) ? sort : Number.MAX_SAFE_INTEGER;
}
