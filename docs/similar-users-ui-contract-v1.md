# Similar Users UI Contract v1

## 1. Purpose

This document defines what the future user-facing "나와 비슷한 흐름" section should show.

It balances two goals:

1. Make the feature interesting enough to feel premium.
2. Avoid ranking, diagnosis, stigma, or privacy concerns.

This is a design contract only. It does not implement frontend, backend, DB, embedding, or vector behavior.

## 2. Product Frame

Use:

```text
나와 비슷한 흐름
```

Meaning:

```text
내 리포트와 가까운 신호 조합을 가진 익명 리포트 그룹에서,
자주 함께 보이는 흐름과 질문을 참고하는 기능
```

Do not frame as:

```text
나와 같은 사람들
나의 심리 유형 그룹
유사 사용자 랭킹
상위/하위 퍼센타일
```

## 3. Member-Facing Section Structure

Recommended section order:

```text
1. Section title and short intro
2. Privacy / reference notice
3. Safety chips
4. Anonymous 2D flow map
5. Similar-flow ratio
6. Common signal chips
7. Common topic cards
8. Reflection questions
```

## 4. Intro Copy

Recommended:

```text
내 리포트의 주요 신호와 비슷한 조합을 가진 익명 리포트들을 바탕으로,
자주 함께 보이는 흐름과 돌아볼 질문을 정리했습니다.

이 비교는 개인을 찾거나 분류하기 위한 기능이 아닙니다.
나를 단정하기보다, 지금의 흐름을 다른 관점에서 이해하기 위한 참고 자료로 읽어 주세요.
```

Safety chips:

- 익명 집계 기준
- 개인 식별 없음
- 자기이해 참고용

## 5. Anonymous 2D Flow Map

### 5.1 Goal

The map should make the section feel exploratory.

It should help users see:

- where their current report flow is roughly connected
- what nearby anonymous flows look like
- which broad direction their current signal combination leans toward

### 5.2 What To Show

Allowed:

- soft current report flow marker
- nearby anonymous report-flow particles or density clouds
- soft radius circle around current marker
- broad flow color groups
- gentle qualitative region labels
- approximate distribution shape
- PCA-style projection of structured similarity vectors

Do not show:

- member names
- exact `sbNo`, `mbNo`, `prNo`
- exact nearest-neighbor rank
- exact vector coordinates
- exact similarity score
- raw internal IDs
- sharp pin / "you are here" marker
- hard grid lines, chart border, or axis arrows
- normal/abnormal zones
- red/yellow/green risk zones

### 5.3 Self Marker Rule

The user's current flow should be visible because it creates the core product interest.

However, it should not look like an exact diagnostic coordinate.

Allowed:

- soft halo
- glow area
- small star-like marker
- translucent circle
- highlighted region overlapping nearby anonymous flow

Avoid:

- red pin
- exact dot on a grid
- "You are here"
- isolated outlier marker
- coordinate tooltip

Preferred label:

```text
내 리포트 흐름
```

Avoid:

```text
내 위치
정확한 위치
이 그룹에 속함
```

### 5.4 Projection Options

Preferred implementation direction:

```text
structured multi-dimensional similarity vector
-> 2D projection for display
-> user-facing anonymous flow map
```

PCA-style projection is acceptable for member-facing UI if it is explained as a 2D compression of many signals, not a precise psychological coordinate system.

Recommended copy:

```text
여러 HTP 신호와 패턴 조합을 2차원으로 압축해,
내 리포트와 가까운 흐름들이 어디에 모이는지 보여드립니다.

이 지도는 진단이나 등급이 아니라,
현재 결과를 다른 관점에서 살펴보기 위한 자기이해 참고 자료입니다.
```

### 5.5 Axis Options

Axis labels are optional.

If PCA is used, avoid pretending that the axes are exact psychological traits.

Avoid:

```text
이 축은 정확히 외향성입니다.
이 축은 불안 정도입니다.
```

Safer:

```text
지도 주변에서 자주 함께 보인 신호
[외부 표현] [관계 거리감] [긴장 반복]
```

If fixed human-readable axes are used instead of PCA, use calm labels.

Recommended first axis pair:

| Axis | Left/Low | Right/High |
|---|---|---|
| X | 내면 정리 | 외부 표현 |
| Y | 긴장 신호 | 균형 단서 |

Alternative:

| Axis | Left/Low | Right/High |
|---|---|---|
| X | 관계 거리감 | 관계 연결감 |
| Y | 표현 에너지 | 회복/정리 에너지 |

Use calm labels. Do not use clinical labels.

### 5.6 Axis / Region Options

Use qualitative regions more than chart axes.

Avoid:

- grid
- hard X/Y arrows
- outer chart border
- quadrant labels that imply good/bad zones

Prefer soft background labels:

- 관계의 흐름 영역
- 에너지 성찰 영역
- 내면 조율 영역
- 회복과 균형 영역

### 5.7 Map Copy

Title:

```text
익명 흐름 지도
```

Caption:

```text
개별 사용자를 보여주는 지도가 아니라, 익명 리포트들의 신호 조합을 흐름으로 배치한 참고 지도입니다.
```

Radius label:

```text
가까운 흐름 범위
```

Current marker:

```text
내 리포트 흐름
```

Interaction rule:

```text
지도 영역을 눌렀을 때는 타인의 리포트나 답변이 아니라,
성찰 질문 카드, 균형 단서, Resource Tarot, 작은 실험으로만 연결합니다.
```

### 5.8 Nearby Anonymous Dots

The map may show a small number of nearby anonymous dots around the current report flow.

Recommended:

- show up to 12-20 nearby dots
- sample from nearest structured-vector results
- keep all dots fully anonymous
- show only 1-2 safe labels per dot
- prefer pattern / flow labels over raw feature keys
- avoid exact distance, exact similarity score, and nearest-neighbor rank

Allowed dot tooltip copy:

```text
가까운 흐름에서 함께 보인 신호
[외부표현-내면보호형] [긴장 반복 사고]
```

Avoid:

```text
8177번과 94% 유사
1번째로 가까운 사용자
이 사람의 리포트 보기
```

If a broader distribution is shown, use background density dots or a soft cloud.
The nearby dots can be slightly more visible than the background points, but they should still feel like anonymous report-flow samples, not individual people.

## 6. Similar-Flow Ratio

### 6.1 Allowed

The ratio should describe the frequency of the flow combination, not user rank.

Preferred:

```text
이와 비슷한 흐름 조합은 전체 익명 리포트 중 약 16%에서 관찰되었습니다.
```

Short label:

```text
비슷한 흐름 비율: 약 16%
```

### 6.2 Not Allowed

Avoid:

```text
유저님은 16% 안에 듭니다.
상위 16%입니다.
하위 16%입니다.
위험도 16%입니다.
```

## 7. Common Signal Chips

### 7.1 Goal

Show which signals often appear near the user's current flow.

This makes the section feel specific without exposing raw data.

### 7.2 Label

```text
가까운 흐름에서 자주 함께 보인 신호
```

Example:

```text
[분노] [수동성] [관계 거리감]
```

Supporting note:

```text
이 신호들은 성격을 단정하는 값이 아니라, 현재 흐름과 함께 돌아볼 만한 주제입니다.
```

### 7.3 Avoid

Avoid:

```text
당신과 비슷한 사람들은 대체로 분노와 수동성이 있습니다.
```

Prefer:

```text
비슷한 흐름의 리포트에서는 함께 살펴볼 신호로 분노, 수동성, 관계 거리감이 자주 나타났습니다.
```

## 8. Topic Cards

Show 2-3 cards.

Each card:

- title
- one short body paragraph
- one reflection question
- optional signal chips

Example:

```text
관계 에너지 조절

비슷한 흐름에서는 가까워지고 싶은 마음과 혼자 정리하고 싶은 마음을 함께 돌아보는 경우가 많습니다.

돌아볼 질문
요즘 나에게 편안한 관계의 거리는 어느 정도인가요?
```

## 9. Age / Gender Aggregate

Age and gender can make the feature feel more personal, but they increase privacy and interpretation risk.

### 9.1 Age Band

Age-band aggregate may be considered after admin testing.

Allowed wording:

```text
비슷한 연령대의 익명 리포트에서는 관계 거리감과 내면 정리 흐름이 함께 보이는 경우가 많았습니다.
```

Prefer broad age bands or relative bands:

```text
비슷한 연령대
```

Avoid exact ages in user-facing UI.

### 9.2 Gender

Gender aggregate should stay admin-only in early MVP.

Do not say:

```text
남성은 원래 ...
여성은 대체로 ...
```

If gender is ever used later, it must be:

- aggregate only
- optional
- non-deterministic
- not used as a causal explanation
- reviewed for privacy and bias risk

## 10. Empty / Insufficient States

### 10.1 Insufficient Cohort

```text
아직 안전하게 비교할 만큼 충분한 익명 데이터가 모이지 않았습니다.
조금 더 신뢰할 수 있는 기준이 준비되면, 비슷한 흐름의 공통 주제를 보여드릴게요.
```

### 10.2 No Stable Similar Flow

```text
현재 기준에서는 뚜렷하게 묶을 만한 유사 흐름을 표시하지 않습니다.
이는 문제가 있다는 뜻이 아니라, 지금은 개인 리포트의 신호를 중심으로 보는 것이 더 적절하다는 의미입니다.
```

## 11. Member-Facing Data Contract Draft

```ts
interface SimilarFlowUiModel {
  title: '나와 비슷한 흐름';
  intro: string;
  safetyLabels: string[];
  map: {
    title: '익명 흐름 지도';
    caption: string;
    xAxisLabel: string;
    yAxisLabel: string;
    currentPoint: {
      x: number;
      y: number;
      label: '내 리포트 흐름';
      markerStyle: 'soft_halo' | 'glow_area' | 'small_star';
    };
    radius: {
      label: '가까운 흐름 범위';
      value: number;
    };
    points: Array<{
      x: number;
      y: number;
      groupLabel: string;
      opacity: number;
    }>;
    nearbyDots: Array<{
      anonymousId: string;
      x: number;
      y: number;
      markerStyle: 'nearby_anonymous_dot';
      groupLabel: string;
      signalLabelsKo: string[];
      sharedSignalLabelsKo: string[];
      proximityBand: 'very_close' | 'close' | 'nearby';
    }>;
    regionLabels?: string[];
  };
  similarFlowRatio: {
    label: '비슷한 흐름 비율';
    text: string;
  };
  commonSignals: Array<{
    labelKo: string;
    descriptionKo: string;
  }>;
  topicCards: Array<{
    title: string;
    body: string;
    signalLabels: string[];
    reflectionQuestion: string;
  }>;
}
```

## 12. Admin-Only Debug Data

Admin preview may show:

- target `sbNo`
- nearest `sbNo`
- similarity score
- shared signals
- raw snapshot JSON
- map coordinate debug

Member UI must not show these debug fields.

## 13. MVP Recommendation

For member-facing MVP, target:

```text
2D anonymous flow map
+ similar-flow ratio
+ common signal chips
+ 2-3 topic cards
```

Do not release:

- exact nearest user list
- exact match %
- percentile rank
- age/gender breakdown
- scatter plot with identifiable points
- sharp "you are here" pin
- chart grid / hard axes / normal-vs-abnormal zones
- clinical-looking risk zones

## 14. Final Principle

The feature should feel interesting because it gives context.

It should not feel powerful because it ranks the user.

```text
재미는 시각화와 익명 흐름 맥락에서 만들고,
판정처럼 보이는 숫자와 사람 비교는 피한다.
```
