import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api-base-url.token';
import { SketchbookImageType } from '../utils/sketchbook-display.util';

export type { SketchbookImageType } from '../utils/sketchbook-display.util';
export type MbtiType =
  | 'INTJ'
  | 'INTP'
  | 'ENTJ'
  | 'ENTP'
  | 'INFJ'
  | 'INFP'
  | 'ENFJ'
  | 'ENFP'
  | 'ISTJ'
  | 'ISFJ'
  | 'ESTJ'
  | 'ESFJ'
  | 'ISTP'
  | 'ISFP'
  | 'ESTP'
  | 'ESFP';

export interface SketchbookUploadItem {
  file: File;
  type: SketchbookImageType;
}

export interface UploadedSketchbookImage {
  sort: number;
  type: SketchbookImageType;
  filename: string;
  url: string;
}

export interface SketchbookUploadResponse {
  sbNo: number;
  sbId: string;
  imageCount: number;
  images: UploadedSketchbookImage[];
}

@Injectable({ providedIn: 'root' })
export class SketchbookUploadService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  upload(
    items: SketchbookUploadItem[],
    metadata: { name?: string; age?: number | null; slType?: number | null; mbtiSelf?: MbtiType | ''; mbtiOthers?: MbtiType | '' } = {}
  ): Observable<SketchbookUploadResponse> {
    const formData = new FormData();

    for (const item of items) {
      formData.append('files', item.file, item.file.name);
    }

    formData.append('types', JSON.stringify(items.map((item) => item.type)));

    if (metadata.name) {
      formData.append('name', metadata.name);
    }

    if (metadata.age) {
      formData.append('age', String(metadata.age));
    }

    if (metadata.slType) {
      formData.append('slType', String(metadata.slType));
    }

    if (metadata.mbtiSelf) {
      formData.append('mbti_self', metadata.mbtiSelf);
    }

    if (metadata.mbtiOthers) {
      formData.append('mbti_others', metadata.mbtiOthers);
    }

    return this.http.post<SketchbookUploadResponse>(`${this.apiBaseUrl}/sketchbook/upload`, formData);
  }
}
