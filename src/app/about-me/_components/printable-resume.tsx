'use client';

import { useRef } from 'react';

import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const PrintableResume = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      // 🎯 고화질 이미지 캡처 (에러 방지를 위해 배경색 강제 지정)
      const dataUrl = await toPng(resumeRef.current, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        cacheBust: true,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // 📄 인쇄창 없이 즉시 파일 저장
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('프론트엔드_엔지니어_신태일_이력서.pdf');
    } catch (error) {
      console.error('PDF 생성 중 에러 발생:', error);
    }
  };

  return (
    <>
      {/* 🔘 태일님이 요청하신 깔끔한 Outline 버튼 스타일 */}
      <div className='print:hidden'>
        <Button
          onClick={handleDownloadPDF}
          variant='outline'
          className='group hover:bg-accent font-bold transition-all'
        >
          <Download className='mr-2 size-4 transition-transform group-hover:-translate-y-0.5' />
          이력서 PDF 저장
        </Button>
      </div>

      {/* 📄 PDF 생성용 영역 (화면에서는 숨김 처리) */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        <div
          ref={resumeRef}
          style={{
            width: '210mm',
            padding: '25mm 20mm',
            minHeight: '297mm',
            backgroundColor: '#ffffff',
            color: '#1a1a1a',
            fontFamily: 'sans-serif',
            display: 'flex',
            flexDirection: 'column',
            gap: '60px',
          }}
        >
          {/* Header */}
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottom: '3px solid #1a1a1a',
              paddingBottom: '30px',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                  margin: 0,
                }}
              >
                신태일
              </h1>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#3b82f6',
                  marginTop: '8px',
                }}
              >
                Frontend Engineer
              </p>
            </div>
            <div
              style={{
                textAlign: 'right',
                fontSize: '11px',
                fontWeight: 700,
                color: '#999',
                lineHeight: 1.8,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}
            >
              <p>taeil012@gmail.com</p>
              <p>010-XXXX-XXXX</p>
              <p>github.com/bigone-77</p>
              <p>tommy-tech.blog (MAU 1,000+)</p>
            </div>
          </header>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}
          >
            {/* Profile Section */}
            <section
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: '40px',
              }}
            >
              <h2
                style={{
                  fontSize: '12px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: '#d1d5db',
                }}
              >
                Profile
              </h2>
              <div
                style={{ fontSize: '14px', lineHeight: 1.7, color: '#4b5563' }}
              >
                <p
                  style={{
                    fontSize: '17px',
                    fontWeight: 800,
                    color: '#111827',
                    marginBottom: '12px',
                  }}
                >
                  "지속 가능한 구조 설계로 비즈니스의 장기적 운영 비용을
                  절감하는 데 집착합니다."
                </p>
                <p>
                  IBSheet 타입 시스템 재구축으로 **런타임 에러 90% 방지**, 기술
                  표준화로 **신규 입사자 온보딩 생산성 70% 향상** 등 실질적인
                  비즈니스 임팩트를 만듭니다.
                </p>
              </div>
            </section>

            {/* Experience Section */}
            <section
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: '40px',
              }}
            >
              <h2
                style={{
                  fontSize: '12px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: '#d1d5db',
                }}
              >
                Experience
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <h3 style={{ fontSize: '19px', fontWeight: 900 }}>
                      (주)클라모스
                    </h3>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#9ca3af',
                      }}
                    >
                      2023.01 — PRESENT
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#3b82f6',
                      marginBottom: '20px',
                      letterSpacing: '0.1em',
                    }}
                  >
                    PART LEAD / FRONTEND ENGINEER
                  </p>
                  <ul
                    style={{
                      paddingLeft: '20px',
                      fontSize: '13.5px',
                      color: '#374151',
                      listStyleType: 'disc',
                    }}
                  >
                    <li style={{ marginBottom: '10px' }}>
                      **[IBSheet8 전면 타입화]** 협업 엔지니어 10명의 개발
                      속도를 30% 향상
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      **[성능 최적화]** 대용량 그리드 렌더링 개선으로 초기 로딩
                      속도 23% 단축
                    </li>
                    <li>
                      **[운영 효율]** 기술 표준 수립으로 온보딩 기간 단축 (14일
                      → 3일)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: '40px',
              }}
            >
              <h2
                style={{
                  fontSize: '12px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: '#d1d5db',
                }}
              >
                Projects
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px',
                }}
              >
                <div
                  style={{
                    borderLeft: '3px solid #f3f4f6',
                    paddingLeft: '20px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 800,
                      marginBottom: '6px',
                    }}
                  >
                    해양경찰 장구류 관리 시스템
                  </p>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>
                    공공데이터 정합성 문제를 기술적으로 해결한 자산 관리 시스템
                  </p>
                </div>
                <div
                  style={{
                    borderLeft: '3px solid #f3f4f6',
                    paddingLeft: '20px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 800,
                      marginBottom: '6px',
                    }}
                  >
                    기술 블로그 운영 (Tommy Tech Blog)
                  </p>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>
                    100건 이상의 문제 해결 과정 기록 및 지식 공유 실천
                  </p>
                </div>
              </div>
            </section>

            {/* Background */}
            <section
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: '40px',
              }}
            >
              <h2
                style={{
                  fontSize: '12px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: '#d1d5db',
                }}
              >
                Background
              </h2>
              <div style={{ display: 'flex', gap: '60px', fontSize: '13px' }}>
                <div>
                  <p style={{ fontWeight: 800 }}>OO대학교 컴퓨터공학 학사</p>
                  <p style={{ color: '#9ca3af', marginTop: '4px' }}>
                    20XX.XX 졸업
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: 800, color: '#3b82f6' }}>
                    소프트웨어 경진대회 최우수상
                  </p>
                  <p style={{ color: '#9ca3af', marginTop: '4px' }}>
                    50팀 참가 중 1위 달성
                  </p>
                </div>
              </div>
            </section>
          </div>

          <footer
            style={{
              marginTop: 'auto',
              borderTop: '1px solid #f3f4f6',
              paddingTop: '30px',
              textAlign: 'center',
              fontSize: '10px',
              fontWeight: 800,
              color: '#e5e7eb',
              letterSpacing: '0.6em',
            }}
          >
            TAEIL SHIN — 2026.01.31
          </footer>
        </div>
      </div>
    </>
  );
};
