# DB Table Map

## DB

mindelevation_db

## Core Tables

### mde_sketchbook

* 유저 + 리포트 저장소
* summary + 상세 문구 포함

### mde_sketchbook_file

* 이미지 경로

### mde_sketchbook_analysis

* feature 저장 (EAV 구조)
* sb_no, si_no, sa_value

### mde_sketchbook_item

* feature 해석 사전
* 심리 라벨 + 문구 포함

### mde_sketchbook_result

* 최종 raw score
* sr_1_* ~ sr_4_*

### mde_sketchbook_setting

* scaling 기준값
* ss_type 기반

## Category Mapping

### Emotional

* sr_1_1 = depression
* sr_1_2 = anxiety
* sr_1_3 = compulsion
* sr_1_4 = anger

### Adaptation

* sr_2_1 = self-control
* sr_2_2 = reality maladaptation
* sr_2_3 = body maladaptation
* sr_2_4 = escape
* sr_2_5 = fixation

### Relationship

* sr_3_1 = dominance
* sr_3_2 = hostility
* sr_3_3 = dependency
* sr_3_4 = withdrawal
* sr_3_5 = relationship need
* sr_3_6 = conflict

### Tendency

* sr_4_1 = confidence
* sr_4_2 = activeness
* sr_4_3 = achievement
* sr_4_4 = extroversion
* sr_4_5 = defensiveness
