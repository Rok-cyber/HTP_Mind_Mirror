export interface AdminSketchbookRouteTarget {
  sbNo: number | string;
  slType?: number | null;
}

export function adminSketchbookAnalysisRoute(target: AdminSketchbookRouteTarget): Array<string | number> {
  return ['/admin/sketchbooks', target.sbNo, Number(target.slType) === 5 ? 'analyze-senior' : 'analyze'];
}

export function adminReportRoute(target: AdminSketchbookRouteTarget): Array<string | number> {
  return ['/report', target.sbNo];
}

export function adminReportQueryParams(target: AdminSketchbookRouteTarget): { admin: '1'; slType?: number | null } {
  return {
    admin: '1',
    slType: target.slType
  };
}

export function adminMemberSketchbooksRoute(mbNo: number | string): Array<string | number> {
  return ['/admin/members', mbNo, 'sketchbooks'];
}
