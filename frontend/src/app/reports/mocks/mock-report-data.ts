import { ReportApiResponse } from '../models/report-api.model';

export const mockReports: Record<string, ReportApiResponse> = {
  'sb-1001': {
    info: {
      user: '샘플 대상자',
      date: '2026.04.14',
      type: '성인'
    },
    images: [
      {
        label: 'House',
        imageUrl: 'assets/placeholders/house.svg',
        note: '저장된 집 그림 파일 예시'
      },
      {
        label: 'Tree',
        imageUrl: 'assets/placeholders/tree.svg',
        note: '저장된 나무 그림 파일 예시'
      },
      {
        label: 'Person',
        imageUrl: 'assets/placeholders/person.svg',
        note: '저장된 사람 그림 파일 예시'
      }
    ],
    emotion: {
      depression: 72,
      anxiety: 65,
      compulsion: 40,
      anger: 80
    },
    adaptation: {
      'self-control': 58,
      'reality maladaptation': 74,
      'body maladaptation': 62,
      escape: 68,
      fixation: 77
    },
      relationship: {
        dominance: 54,
      hostility: 67,
      dependency: 49,
      withdrawal: 79,
      'relationship need': 70,
      conflict: 76
    },
    tendency: {
      confidence: 57,
      activeness: 48,
      achievement: 64,
      extroversion: 45,
      defensiveness: 82
    },
    raw: {
      emotion: {
        depression: 2,
        anxiety: 1,
        compulsion: 0,
        anger: 3
      },
      adaptation: {
        'self-control': 0,
        'reality maladaptation': 2,
        'body maladaptation': 1,
        escape: 1,
        fixation: 3
      },
      relationship: {
        dominance: 0,
        dominance_m: 1,
        hostility: 1,
        dependency: 1,
        dependency_m: 0,
        withdrawal: 3,
        'relationship need': 2,
        'relationship need_m': 0,
        conflict: 2
      },
      tendency: {
        confidence: 1,
        confidence_m: 0,
        activeness: 0,
        activeness_m: 2,
        achievement: 1,
        extroversion: 0,
        extroversion_m: 2,
        defensiveness: 3
      }
    },
    summary:
      '이 샘플 리포트는 /report/:sbId 응답 형식을 기준으로 구성되어 있습니다. 점수는 50점을 기준으로 환산된 표시 점수이며, 점수가 높을수록 해당 신호가 더 강하게 나타납니다. 전반적으로 정서적 긴장, 적응상의 부담, 조심스러운 대인관계, 방어적인 사회적 태도가 함께 관찰됩니다.',
    details: {
      emotion:
        '정서 문제 영역에서는 우울, 불안, 강박, 분노 신호를 함께 살펴봅니다. 이 샘플에서는 분노와 우울이 상대적으로 높아, 스트레스 상황에서 좌절감과 저하된 기분이 서로 영향을 줄 수 있음을 시사합니다.',
      adaptation:
        '적응 문제 영역에서는 자기통제, 현실 부적응, 신체 부적응, 도피, 고착 신호를 함께 살펴봅니다. 표시 점수는 모호한 요구를 마주할 때 경직이나 회피가 대처 방식으로 나타날 가능성을 보여줍니다.',
      relationship:
        '대인관계 영역에서는 지배성, 적대감, 의존성, 위축, 관계 욕구, 갈등 신호를 함께 살펴봅니다. 위축과 갈등이 높게 나타나면서도 관계 욕구가 함께 확인되어, 단순한 단절보다 조심스러운 연결 욕구로 해석할 수 있습니다.',
      tendency:
        '사회적 성향 영역에서는 자신감, 활동성, 성취성, 외향성, 방어성 신호를 함께 살펴봅니다. 방어성이 가장 높고 활동성과 외향성이 낮게 나타나, 신중한 자기표현과 선택적인 사회적 참여가 예상됩니다.'
    }
  }
};

export const defaultMockReportId = 'sb-1001';
