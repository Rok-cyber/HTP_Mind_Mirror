# Rebuild Principles

## Goal

Legacy HTP platform → Modern web-based insight platform

## Core Strategy

* ❌ Legacy UI 제거
* ✅ DB / 이미지 / 결과 / 문구 유지
* ❌ 분석 엔진 재구현 (초기)
* ✅ 결과 조회 기반 MVP

## Product Direction

* Structure: consumer insight report
* Visualization: data-driven health-style dashboard
* Tone: concise premium insight language

## Architecture Principle

* Frontend (Angular)
* Backend API (Node or lightweight layer)
* DB (read-only MVP)
* Analysis Engine (later phase)

## MVP Rule

“기존 결과를 빠르게 잘 보여주는 것”이 핵심

## Non-goals

* 완전한 분석 엔진 복원
* 관리자 시스템 재구축
* 결제/상용화 기능
