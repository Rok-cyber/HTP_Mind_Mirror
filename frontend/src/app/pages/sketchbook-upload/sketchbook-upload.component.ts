import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs';

import {
  MbtiType,
  SketchbookUploadResponse,
  SketchbookUploadService
} from '../../sketchbook/services/sketchbook-upload.service';
import {
  getSketchbookImageTypeLabel,
  isSketchbookImageType,
  SketchbookImageType,
  sketchbookImageTypeOptions,
  uploadSketchbookTypeOptions
} from '../../sketchbook/utils/sketchbook-display.util';

interface UploadRow {
  id: string;
  file: File;
  type: SketchbookImageType;
  previewUrl: string;
}

const mbtiOptions: MbtiType[] = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP'
];

const ageValidationMessage = '올바른 나이를 입력하세요.';

@Component({
  selector: 'app-sketchbook-upload',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './sketchbook-upload.component.html'
})
export class SketchbookUploadComponent {
  private readonly uploadService = inject(SketchbookUploadService);
  private readonly router = inject(Router);

  protected readonly imageTypes = sketchbookImageTypeOptions;
  protected readonly sketchbookTypes = uploadSketchbookTypeOptions;
  protected readonly mbtiOptions = mbtiOptions;
  protected readonly rows$ = new BehaviorSubject<UploadRow[]>([]);
  protected name = '';
  protected age = '';
  protected slType = 2;
  protected mbtiSelf: MbtiType | '' = '';
  protected mbtiOthers: MbtiType | '' = '';
  protected isDragging = false;
  protected isUploading = false;
  protected errorMessage = '';
  protected result: SketchbookUploadResponse | null = null;

  protected addFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addFileList(input.files);
    input.value = '';
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();

    if (event.currentTarget === event.target) {
      this.isDragging = false;
    }
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    this.addFileList(event.dataTransfer?.files ?? null);
  }

  private addFileList(fileList: FileList | null): void {
    const files = Array.from(fileList ?? []).filter((file) => file.type.startsWith('image/'));

    if (files.length > 0) {
      const additions = files.map((file) => ({
        id: crypto.randomUUID(),
        file,
        type: 'extra' as SketchbookImageType,
        previewUrl: URL.createObjectURL(file)
      }));
      this.rows$.next([...this.rows$.value, ...additions]);
      this.result = null;
      this.errorMessage = '';
    }
  }

  protected updateType(rowId: string, type: string): void {
    this.rows$.next(
      this.rows$.value.map((row) => (row.id === rowId && isSketchbookImageType(type) ? { ...row, type } : row))
    );
  }

  protected remove(rowId: string): void {
    const row = this.rows$.value.find((item) => item.id === rowId);

    if (row) {
      URL.revokeObjectURL(row.previewUrl);
    }

    this.rows$.next(this.rows$.value.filter((item) => item.id !== rowId));
  }

  protected upload(): void {
    const rows = this.rows$.value;

    if (rows.length === 0 || this.isUploading) {
      return;
    }

    const age = parseValidAge(this.age);

    if (age == null) {
      this.errorMessage = ageValidationMessage;
      return;
    }

    this.isUploading = true;
    this.errorMessage = '';
    this.result = null;

    this.uploadService
      .upload(
        rows.map((row) => ({ file: row.file, type: row.type })),
        {
          name: this.name.trim() || undefined,
          age,
          slType: this.slType,
          mbtiSelf: this.mbtiSelf,
          mbtiOthers: this.mbtiOthers
        }
      )
      .pipe(
        tap((result) => {
          this.result = result;
          for (const row of this.rows$.value) {
            URL.revokeObjectURL(row.previewUrl);
          }
          this.rows$.next([]);
          this.router.navigate(['/report', result.sbNo]);
        }),
        catchError((error: unknown) => {
          this.errorMessage = getUploadErrorMessage(error);
          return of(null);
        }),
        finalize(() => {
          this.isUploading = false;
        })
      )
      .subscribe();
  }

  protected typeLabel(type: SketchbookImageType): string {
    return getSketchbookImageTypeLabel(type);
  }
}

function getUploadErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error && 'error' in error) {
    const responseError = (error as { error?: { error?: string } }).error?.error;

    if (responseError) {
      return responseError;
    }
  }

  return '스케치북 업로드에 실패했습니다.';
}

function parseValidAge(value: string): number | null {
  const ageText = value.trim();

  if (!/^\d+$/.test(ageText)) {
    return null;
  }

  const age = Number(ageText);
  return Number.isInteger(age) && age >= 1 && age <= 100 ? age : null;
}
