import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';

import {
  PremiumNarrativePatternItem,
  PremiumNarrativeQuestionGroup,
  PremiumNarrativeReflectionSection,
  PremiumNarrativeReport,
  PremiumNarrativeResourceItem
} from '../../premium-report/models/premium-narrative-report.model';
import {
  PremiumSimilarityAnonymousMapPoint,
  PremiumSimilarityAnonymousMapView,
  PremiumSimilarityNearbyAnonymousDot
} from '../../premium-report/models/premium-similarity-map.model';
import { PremiumReportDataService } from '../../premium-report/services/premium-report-data.service';
import {
  toPremiumReportDisplayText,
  toPremiumSignalLabelText
} from '../../premium-report/utils/premium-report-display-text.util';
import { resolvePremiumReportLoadErrorMessage } from '../../premium-report/utils/premium-report-error.util';
import {
  getPremiumReportRouteParams,
  validatePremiumReportRouteParams
} from '../../premium-report/utils/premium-report-route.util';
import {
  getPremiumAdditionalQuestions,
  getPremiumCorePatternItems,
  getPremiumQuestionGroups,
  getPremiumResourceItems,
  getPremiumTensionPatternItems,
  hasPremiumListItems,
  hasPremiumQuestionGroups,
  trackPremiumText
} from '../../premium-report/utils/premium-report-section.util';
import {
  findFallbackHeroVisualMetaInText,
  getArchetypeVisualMeta,
  getFallbackHeroVisualMeta
} from '../../premium-report/visual-registry/premium-visual-card-registry';
import {
  buildPremiumReportVisualCards,
  getPremiumVisualCardBody,
  getPremiumVisualCardLayerLabel,
  getPremiumVisualCardTitle
} from '../../premium-report/utils/premium-report-visual-card.util';

type PremiumReportPrintState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | {
      status: 'loaded';
      report: PremiumNarrativeReport;
      similarFlowMap: PremiumSimilarityAnonymousMapView | null;
      sbNo: string;
      prNo?: string;
      contextLabel?: string;
    };

type LoadedPremiumReportPrintState = Extract<PremiumReportPrintState, { status: 'loaded' }>;

interface PrintVisualCard {
  label: string;
  title: string;
  body: string;
  imagePath?: string;
}

@Component({
  selector: 'app-premium-report-print',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './premium-report-print.component.html',
  styleUrl: './premium-report-print.component.css'
})
export class PremiumReportPrintComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly reportData = inject(PremiumReportDataService);

  protected readonly state$: Observable<PremiumReportPrintState> = this.route.paramMap.pipe(
    map(getPremiumReportRouteParams),
    switchMap((routeParams) => {
      const validation = validatePremiumReportRouteParams(routeParams);

      if (!validation.valid) {
        return of({
          status: 'error',
          message: validation.message
        } satisfies PremiumReportPrintState);
      }

      const { sbNo, prNo } = validation;

      return this.reportData.getPremiumReportWithSimilarFlowMap(sbNo, prNo).pipe(
        map(
          ({ response, similarFlowMap }): PremiumReportPrintState => ({
            status: 'loaded',
            report: response.report,
            similarFlowMap,
            sbNo,
            ...(prNo ? { prNo, contextLabel: `저장된 리포트 버전 #${response.record.prNo}` } : {})
          })
        ),
        startWith({ status: 'loading' } as PremiumReportPrintState),
        catchError((error: unknown) =>
          of({
            status: 'error',
            message: resolvePremiumReportLoadErrorMessage(error)
          } satisfies PremiumReportPrintState)
        )
      );
    }),
    startWith({ status: 'loading' } as PremiumReportPrintState)
  );

  protected print(): void {
    window.print();
  }

  protected reportRoute(state: LoadedPremiumReportPrintState): unknown[] {
    if (this.router.url.startsWith('/my/reports/')) {
      return ['/my', 'reports', state.sbNo, 'premium'];
    }

    return state.prNo ? ['/premium-report', state.sbNo, 'versions', state.prNo] : ['/premium-report', state.sbNo];
  }

  protected displayText(value: string | null | undefined): string {
    return toPremiumReportDisplayText(value);
  }

  protected getCorePatternItems(report: PremiumNarrativeReport): PremiumNarrativePatternItem[] {
    return getPremiumCorePatternItems(report);
  }

  protected getTensionPatternItems(report: PremiumNarrativeReport): PremiumNarrativePatternItem[] {
    return getPremiumTensionPatternItems(report);
  }

  protected getResourceItems(report: PremiumNarrativeReport): PremiumNarrativeResourceItem[] {
    return getPremiumResourceItems(report);
  }

  protected hasListItems(items: string[] | undefined): boolean {
    return hasPremiumListItems(items);
  }

  protected hasQuestionGroups(section: PremiumNarrativeReflectionSection | undefined): boolean {
    return hasPremiumQuestionGroups(section);
  }

  protected getQuestionGroups(section: PremiumNarrativeReflectionSection | undefined): PremiumNarrativeQuestionGroup[] {
    return getPremiumQuestionGroups(section);
  }

  protected getAdditionalQuestions(section: PremiumNarrativeReflectionSection | undefined): string[] {
    return getPremiumAdditionalQuestions(section, 3);
  }

  protected getHeroImagePath(report: PremiumNarrativeReport): string | undefined {
    const archetype = report.archetypeSection;
    const visual =
      getArchetypeVisualMeta(archetype?.primaryArchetypeId ?? archetype?.primaryArchetypeName) ??
      getFallbackHeroVisualMeta(archetype?.fallbackHeroId ?? archetype?.title) ??
      findFallbackHeroVisualMetaInText([archetype?.title, archetype?.body, archetype?.reflectionFocus].filter(Boolean).join(' '));

    return visual?.imagePath ?? visual?.fallbackImagePath;
  }

  protected getVisualCards(report: PremiumNarrativeReport): PrintVisualCard[] {
    return buildPremiumReportVisualCards(this.getCorePatternItems(report), this.getTensionPatternItems(report), this.getResourceItems(report))
      .map((card) => {
        const label = getPremiumVisualCardLayerLabel(card.layer);

        return {
          label,
          title: getPremiumVisualCardTitle(card, label) || label,
          body: getPremiumVisualCardBody(card) ?? '',
          imagePath: card.imagePath ?? card.visualMeta?.fallbackImagePath
        };
      })
      .filter((card) => card.title || card.body)
      .slice(0, 5);
  }

  protected getMapPoints(mapView: PremiumSimilarityAnonymousMapView): PremiumSimilarityAnonymousMapPoint[] {
    return mapView.mapPoints;
  }

  protected getNearbyDots(mapView: PremiumSimilarityAnonymousMapView): PremiumSimilarityNearbyAnonymousDot[] {
    return mapView.nearbyDots.slice(0, 10);
  }

  protected toXPercent(value: number): number {
    return this.toPercent(value);
  }

  protected toYPercent(value: number): number {
    return 100 - this.toPercent(value);
  }

  protected getSignalLabel(label: string): string {
    return toPremiumSignalLabelText(label);
  }

  protected trackText(index: number, item: string): string {
    return trackPremiumText(index, item);
  }

  private toPercent(value: number): number {
    const normalized = (value + 1.2) / 2.4;
    return Math.max(4, Math.min(96, Math.round(normalized * 1000) / 10));
  }
}
